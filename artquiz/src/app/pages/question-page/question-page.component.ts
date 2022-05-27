import { Component, OnInit } from '@angular/core';
import { DataModel } from 'src/app/core/models/response';
import { DataService } from '../../core/services/data.service';
import { getRandomNumber, shuffleArray } from '../../core/functions';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';
import { ModalComponent } from '../../core/components/modal/modal.component';




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
    public matDialog: MatDialog,
  ) {
    this.round = this.dataService.round
  }

  ngOnInit(): void {
    this.dataService.roundChange.subscribe(value => {
      this.round = value;
    });
    this.rightAnswer = this.round[this.currentIndex];
    this.generateVariants();
  }

  generateVariants() {
    const dataLength = this.dataService.data.length - 1;
    let wrongVariants: DataModel[] = [...new Set([])];
    const wrongVariantsCount = 3;
    while (wrongVariants.length !== wrongVariantsCount) {
      let variant;
      variant = this.dataService.data[getRandomNumber(0, dataLength)];
      if (+variant.imageNum !== +this.rightAnswer.imageNum && variant.authorEN !== this.rightAnswer.authorEN) {
        wrongVariants.push(variant);
      }
    }
    const random = shuffleArray([...wrongVariants, this.rightAnswer]);
    //console.log(random);
    this.variants = random;
  }

  checkAnswer(answer: number) {
    console.log('check', answer);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      answer: this.rightAnswer,
      isCorrect: 'correct',
    };
    this.matDialog.open(ModalComponent, dialogConfig);
  }
}
