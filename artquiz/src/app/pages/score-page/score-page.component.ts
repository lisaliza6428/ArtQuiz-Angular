import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PictureModalComponent } from '../../core/components/modals/picture-modal/picture-modal.component';
import { DataModel } from '../../core/models/response';
import { QUESTIONS_COUNT } from '../../core/shared/consts';

@Component({
  selector: 'app-score-page',
  templateUrl: './score-page.component.html',
  styleUrls: ['./score-page.component.scss'],
})
export class ScorePageComponent implements OnInit {
  maxScore = QUESTIONS_COUNT;

  score = 0;

  constructor(public dataService: DataService, public matDialog: MatDialog) {}

  ngOnInit(): void {
    this.getScore();
  }

  getScore() {
    const imageNum = +this.dataService.round.sort(
      (x: DataModel, y: DataModel) => +x.imageNum - +y.imageNum
    )[0].imageNum;
    const answers = this.dataService.getAnswersArray();
    const results = answers
      .slice(imageNum, imageNum + QUESTIONS_COUNT)
      .reduce((x: number, y: number) => +x + +y, 0);
    this.score = results;
  }

  showDescription(picture: DataModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      question: false,
      gallery: true,
      picture: picture,
    };
    this.matDialog.open(PictureModalComponent, dialogConfig);
  }
}
