import { Injectable } from '@angular/core';
import { DataModel } from '../models/response';
import { DataService } from './data.service';
import { getRandomNumber, shuffleArray } from '../functions';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FinishModalComponent } from '../components/finish-modal/finish-modal.component';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  timer = true;
  timerChange: Subject<boolean> = new Subject<boolean>();
  round!: DataModel[];
  variants!: DataModel[];
  variantsChange: Subject<DataModel[]> = new Subject<DataModel[]>();
  rightAnswer!: DataModel;
  rightAnswerChange: Subject<DataModel> = new Subject<DataModel>();
  currentIndex = 0;
  currentIndexChange: Subject<number> = new Subject<number>();
  roundAnswers: number[] = new Array(10).fill(0);
  roundAnswersChange: Subject<number[]> = new Subject<number[]>();

  constructor(
    public dataService: DataService,
    public router: Router,
    public matDialog: MatDialog,
  ) {
    this.round = this.dataService.round;

    this.variantsChange.subscribe((value: DataModel[]) => {
      this.variants = value;
    });
    this.currentIndexChange.subscribe((value: number) => {
      this.currentIndex = value;
    });
    this.rightAnswerChange.subscribe((value: DataModel) => {
      this.rightAnswer = value;
    });
    this.dataService.roundChange.subscribe((value: DataModel[]) => {
      this.round = value;
    });
    this.roundAnswersChange.subscribe((value: number[]) => {
      this.roundAnswers = value;
    });
    this.timerChange.subscribe((value: boolean) => {
      this.timer = value;
    });
  }

  public generateVariants() {
    this.rightAnswer = this.dataService.round[this.currentIndex];
    this.rightAnswerChange.next(this.rightAnswer);
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
    this.variantsChange.next(random);
  }

  public quitQuiz(){
    this.currentIndexChange.next(0);
    this.roundAnswersChange.next(new Array(10).fill(0));
    this.router.navigate(['/categories'])
  }

  public checkFinish(){
    let index = this.currentIndex + 1;
    if (index === 10) {
      this.finishRoundActions();
    } else {
      this.currentIndexChange.next(index);
      this.generateVariants();
    }
  }

  checkAnswer(answer: number) {
    let isCorrect = '';
    if (+this.rightAnswer.imageNum === answer) {
      isCorrect = 'correct';
      this.getSound('correct');
      this.roundAnswers[this.currentIndex] = 1;
      this.roundAnswersChange.next(this.roundAnswers);
    } else {
      isCorrect = 'wrong';
      this.getSound('wrong');
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      answer: this.rightAnswer,
      isCorrect: isCorrect,
    };
    this.matDialog.open(ModalComponent, dialogConfig);
  }

  finishRoundActions(){
    this.updateAnswersArray();
    this.getSound('finish');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      score: this.roundAnswers.reduce((x, y) => x + y, 0),
    };
    this.matDialog.open(FinishModalComponent, dialogConfig);
    this.currentIndexChange.next(0);
    this.roundAnswers = new Array(10).fill(0);
    this.roundAnswersChange.next(this.roundAnswers);
  }

  updateAnswersArray() {
    const arr = this.dataService.getAnswersArray();
    this.round.forEach((roundItem, index) => {
      let imageNum = roundItem.imageNum;
      let answer = this.roundAnswers[index];
      arr[imageNum] = `${answer}`;
    })
    this.dataService.setAnswersArray(arr);
  }
  
  getSound(answer: string){
    const audio = new Audio();
    const settings = this.dataService.getSettings();
    audio.volume = settings.volume;
    audio.src = `../../../assets/audio/${answer}.mp3`;
    audio.play();
  }
}
