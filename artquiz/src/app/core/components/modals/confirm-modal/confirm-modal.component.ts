import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalActionsService } from '../../../services/modal-actions.service';
import { DialogConfigConfirmModel } from '../../../../core/models/dialog-config';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public modalData: DialogConfigConfirmModel,
    private modalActionsService: ModalActionsService
  ) {}

  public action() {
    this.modalActionsService.modalAction(this.modalData);
  }

  public cancelAction() {
    this.modalActionsService.modalCancelAction(this.modalData);
  }
}
