import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QUESTIONS_COUNT } from '../../../shared/consts';
import { DialogConfigModel } from 'src/app/core/models/dialog-config';

@Component({
  selector: 'app-finish-modal',
  templateUrl: './finish-modal.component.html',
  styleUrls: ['./finish-modal.component.scss'],
})
export class FinishModalComponent {
  public maxScore: number;

  constructor(@Inject(MAT_DIALOG_DATA) public modalData: DialogConfigModel) {
    this.maxScore = QUESTIONS_COUNT;
  }
}
