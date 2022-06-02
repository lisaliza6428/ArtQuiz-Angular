import { Component, AfterViewInit, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { DataModel } from 'src/app/core/models/response';
import { DataService } from '../../core/services/data.service';
import { getRandomNumber, shuffleArray } from '../../core/functions';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PictureModalComponent } from '../../core/components/modals/picture-modal/picture-modal.component';
import { ConfirmModalComponent } from '../../core/components/modals/confirm-modal/confirm-modal.component';
import { QuestionService } from '../../core/services/question.service';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss'],
  
})
export class QuestionPageComponent{

  constructor(
    public dataService: DataService,
    public questionService: QuestionService,
    public matDialog: MatDialog,
  ) { }

  openConfirmModal() {
    this.questionService.checkTimer();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      message: 'Are you sure you want to leave?',
      actionButtonText: 'Yes, leave',
      cancelButtonText: 'Cancel',
      timerValue: +this.questionService.timerSec,
      timerLineWidth: this.questionService.timerLineWidth,
    };
    this.matDialog.open(ConfirmModalComponent, dialogConfig);
  }


}
