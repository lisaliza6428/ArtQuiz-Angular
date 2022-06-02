import { Component } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../../core/components/modals/confirm-modal/confirm-modal.component';
import { QuestionService } from '../../core/services/question.service';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss'],
})
export class QuestionPageComponent {
  constructor(
    public dataService: DataService,
    public questionService: QuestionService,
    public matDialog: MatDialog
  ) {}

  openConfirmModal() {
    this.questionService.checkTimer();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      modal: 'leaveQuestion',
      message: 'Are you sure you want to leave?',
      actionButtonText: 'Yes, leave',
      cancelButtonText: 'Cancel',
    };
    this.matDialog.open(ConfirmModalComponent, dialogConfig);
  }
}
