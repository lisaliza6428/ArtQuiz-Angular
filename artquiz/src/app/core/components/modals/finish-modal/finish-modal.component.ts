import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionService } from '../../../services/question.service';
import { QUESTIONS_COUNT } from '../../../../core/consts';

@Component({
  selector: 'app-finish-modal',
  templateUrl: './finish-modal.component.html',
  styleUrls: ['./finish-modal.component.scss'],
})
export class FinishModalComponent {
  maxScore = QUESTIONS_COUNT;

  constructor(
    public dialogRef: MatDialogRef<FinishModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    public questionService: QuestionService
  ) {}
}
