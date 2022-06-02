import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-modal',
  templateUrl: './picture-modal.component.html',
  styleUrls: ['./picture-modal.component.scss'],
})
export class PictureModalComponent {
  constructor(
    public dialogRef: MatDialogRef<PictureModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    public questionService: QuestionService
  ) {}
}
