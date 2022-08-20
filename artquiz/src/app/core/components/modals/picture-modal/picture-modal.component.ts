import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogConfigModel } from 'src/app/core/models/dialog-config';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-modal',
  templateUrl: './picture-modal.component.html',
  styleUrls: ['./picture-modal.component.scss'],
})
export class PictureModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public modalData: DialogConfigModel,
    public questionService: QuestionService
  ) {}
}
