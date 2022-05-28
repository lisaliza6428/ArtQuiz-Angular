import { Component, OnInit } from '@angular/core';
import { DataModel } from 'src/app/core/models/response';
import { DataService } from '../../core/services/data.service';
import { getRandomNumber, shuffleArray } from '../../core/functions';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { ConfirmModalComponent } from '../../core/components/confirm-modal/confirm-modal.component';
import { QuestionService } from '../../core/services/question.service';


@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent implements OnInit {

  round!: DataModel[];
  variants!: DataModel[];
  rightAnswer!: DataModel;
  currentIndex = 0;

  constructor(
    public dataService: DataService,
    public questionService: QuestionService,
    public matDialog: MatDialog,
  ) {
    this.round = this.dataService.round;
    this.variants = this.questionService.variants;
    this.currentIndex = this.questionService.currentIndex;
    this.rightAnswer = this.questionService.rightAnswer;
   }

  ngOnInit(): void {
    this.dataService.roundChange.subscribe(value => {
      this.round = value;
    });
    this.questionService.variantsChange.subscribe(value => {
      this.variants = value;
    });
    this.questionService.currentIndexChange.subscribe(value => {
      this.currentIndex = value;
    });
    this.questionService.rightAnswerChange.subscribe(value => {
      this.rightAnswer = value;
    });
  }

  openConfirmModal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      message: 'Are you sure you want to leave?',
      actionButtonText: 'Yes, leave',
      cancelButtonText: 'Cancel',
    };
    this.matDialog.open(ConfirmModalComponent, dialogConfig);

  }
}
