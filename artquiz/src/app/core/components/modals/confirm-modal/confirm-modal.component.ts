import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { DataService } from '../../../services/data.service';
import { ModalActionsService } from '../../../services/modal-actions.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    public router: Router,
    public questionService: QuestionService,
    public dataService: DataService,
    public modalActionsService: ModalActionsService,
  ) { }

  action() {
    this.modalActionsService.modalAction(this.modalData);
  }

  cancelAction() {
    this.modalActionsService.modalCancelAction(this.modalData);
  }
}
