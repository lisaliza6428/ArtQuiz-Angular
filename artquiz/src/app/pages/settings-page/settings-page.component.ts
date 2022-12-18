import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { DataService } from '../../core/services/data.service';
import { QuestionService } from '../../core/services/question.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../../core/components/modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent implements OnInit {
  private volumeValue: number;

  private timerValueStep: number;

  public minTimerValue: number;

  public maxTimerValue: number;

  constructor(
    public dataService: DataService,
    public questionService: QuestionService,
    private matDialog: MatDialog
  ) {
    this.volumeValue = 0;
    this.timerValueStep = 5;
    this.minTimerValue = 5;
    this.maxTimerValue = 30;
  }

  ngOnInit(): void {
    this.volumeValue = this.dataService.getSettings().volume;
  }

  public handleVolumeChange(event: MatSliderChange): void {
    if (event.value != null) {
      this.dataService.updateSettings('volume', event.value);
      this.questionService.getSound('correct');
    }
  }

  public handleTimerChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.questionService.timerChange.next(true);
      this.dataService.updateSettings('timer', true);
    } else {
      this.questionService.timerChange.next(false);
      this.dataService.updateSettings('timer', false);
    }
  }

  public minusButtonAction(): void {
    let seconds = this.dataService.getSettings().timerValue;
    if (+seconds > this.minTimerValue) {
      seconds = +seconds - this.timerValueStep;
      this.dataService.updateSettings('timerValue', seconds);
    }
  }

  public plusButtonAction(): void {
    let seconds = this.dataService.getSettings().timerValue;
    if (+seconds < this.maxTimerValue) {
      seconds = +seconds + this.timerValueStep;
      this.dataService.updateSettings('timerValue', seconds);
    }
  }

  public defaultButtonAction(): void {
    this.dataService.setDefaultSettings();
    this.questionService.timerChange.next(true);
  }

  public resetButtonAction(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      modal: 'resetProgress',
      message: 'Are you sure you want to reset your progress?',
      actionButtonText: 'Yes, reset',
      cancelButtonText: 'Cancel',
    };
    this.matDialog.open(ConfirmModalComponent, dialogConfig);
  }
}
