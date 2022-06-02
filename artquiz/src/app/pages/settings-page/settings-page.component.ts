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

  volumeValue!: number;

  constructor(
    public dataService: DataService,
    public questionService: QuestionService,
    public matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.volumeValue = this.dataService.getSettings().volume;
  }

  handleVolumeChange(event: MatSliderChange) {
    if (event.value != null) {
      this.dataService.updateSettings('volume', event.value );
      this.questionService.getSound('correct');
    }
  }

  handleTimerChange(event: Event) {
    console.log((event.target as HTMLInputElement).checked);
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.questionService.timerChange.next(true); 
    } else {
      this.questionService.timerChange.next(false);
    }

  }

  minusButtonAction() {
    let seconds = this.dataService.getSettings().timerValue;
    if (+seconds > 5) {
      seconds = +seconds - 5;
      this.dataService.updateSettings('timerValue', seconds);
    }
  }

  plusButtonAction() {
    let seconds = this.dataService.getSettings().timerValue;
    if (+seconds < 30) {
      seconds = +seconds + 5;
      this.dataService.updateSettings('timerValue', seconds);
    }
    
  }

  defaultButtonAction() {
    this.dataService.setDefaultSettings();
    this.questionService.timerChange.next(true);

  }

  resetButtonAction() {
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
