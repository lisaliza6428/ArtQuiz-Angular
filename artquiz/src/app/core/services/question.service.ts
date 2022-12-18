import { Injectable } from '@angular/core';
import { DataModel } from '../models/response';
import { DataService } from './data.service';
import { getRandomNumber, shuffleArray } from '../shared/functions';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FinishModalComponent } from '../components/modals/finish-modal/finish-modal.component';
import { PictureModalComponent } from '../components/modals/picture-modal/picture-modal.component';
import { QUESTIONS_COUNT } from '../shared/consts';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  timer = true;

  timerChange: Subject<boolean> = new Subject<boolean>();

  timerSec = '';

  variants!: DataModel[];

  rightAnswer!: DataModel;

  currentIndex = 0;

  roundAnswers: number[] = new Array(QUESTIONS_COUNT).fill(0);

  currentTimer!: ReturnType<typeof setTimeout>;

  currentTimerAnimation!: ReturnType<typeof setTimeout>;

  timerLineWidth = 0;

  constructor(
    public dataService: DataService,
    public router: Router,
    public matDialog: MatDialog
  ) {
    this.timerChange.subscribe((value: boolean) => {
      this.timer = value;
    });
    this.timerSec = this.dataService.getSettings().timerValue;
    this.timer = this.dataService.getSettings().timer;
  }

  public generateQuestion() {
    this.rightAnswer = this.dataService.round[this.currentIndex];
    const dataLength = this.dataService.data.length - 1;
    let wrongVariants: DataModel[] = [...new Set([])];
    const wrongVariantsCount = 3;
    while (wrongVariants.length !== wrongVariantsCount) {
      let variant;
      variant = this.dataService.data[getRandomNumber(0, dataLength)];
      if (
        +variant.imageNum !== +this.rightAnswer.imageNum &&
        variant.authorEN !== this.rightAnswer.authorEN
      ) {
        wrongVariants.push(variant);
      }
    }
    const random = shuffleArray([...wrongVariants, this.rightAnswer]);
    this.variants = random;

    if (this.timer) {
      this.timerSec = this.dataService.getSettings().timerValue;
      this.startTimer(+this.timerSec);
    }
  }

  public quitQuiz() {
    this.timerLineWidth = 0;
    this.currentIndex = 0;
    this.roundAnswers = new Array(QUESTIONS_COUNT).fill(0);
    this.router.navigate(['/categories']);
  }

  public checkFinish() {
    this.timerLineWidth = 0;
    let index = this.currentIndex + 1;
    if (index === QUESTIONS_COUNT) {
      this.finishRoundActions();
    } else {
      this.currentIndex = index;
      this.generateQuestion();
    }
  }

  public checkAnswer(e: Event, answer: number) {
    this.checkTimer();
    let isCorrect = '';
    if (+this.rightAnswer.imageNum === answer) {
      (e.target as HTMLElement).classList.add('correct');
      isCorrect = 'correct';
      this.getSound('correct');
      this.roundAnswers[this.currentIndex] = 1;
    } else {
      (e.target as HTMLElement).classList.add('wrong');
      isCorrect = 'wrong';
      this.getSound('wrong');
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      question: true,
      gallery: false,
      picture: this.rightAnswer,
      isCorrect: isCorrect,
    };
    this.matDialog.open(PictureModalComponent, dialogConfig);
  }

  public finishRoundActions() {
    this.updateAnswersArray();
    this.getSound('finish');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      score: this.roundAnswers.reduce((x, y) => x + y, 0),
    };
    this.matDialog.open(FinishModalComponent, dialogConfig);
    this.currentIndex = 0;
    this.roundAnswers = new Array(QUESTIONS_COUNT).fill(0);
  }

  public checkTimer() {
    if (this.timer) {
      clearInterval(this.currentTimer);
      clearInterval(this.currentTimerAnimation);
    }
  }

  public updateAnswersArray() {
    const arr = this.dataService.getAnswersArray();
    this.dataService.round.forEach((roundItem, index) => {
      let imageNum = roundItem.imageNum;
      let answer = this.roundAnswers[index];
      arr[imageNum] = `${answer}`;
    });
    this.dataService.setAnswersArray(arr);
  }

  public getSound(answer: string) {
    const audio = new Audio();
    const settings = this.dataService.getSettings();
    audio.volume = settings.volume;
    audio.src = `../../../assets/audio/${answer}.mp3`;
    audio.play();
  }

  public checkIsTimeOver() {
    this.getSound('wrong');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      question: true,
      gallery: false,
      picture: this.rightAnswer,
      isCorrect: 'wrong',
    };
    this.matDialog.open(PictureModalComponent, dialogConfig);
  }

  public startTimer(time: number) {
    this.renderTimerValue(time);
    this.startAnimation(time);
    const timer = () => {
      time -= 1;
      if (time <= 0) {
        this.checkTimer();
        this.checkIsTimeOver();
        this.timerSec = `0${0}`;
      } else if (time <= 9) {
        this.timerSec = `0${time}`;
      } else {
        this.timerSec = `${time}`;
      }
    };
    this.currentTimer = setInterval(timer, 1000);
  }

  public renderTimerValue(time: number) {
    const number = 9;
    if (time <= number) {
      this.timerSec = `0${time}`;
    } else {
      this.timerSec = `${time}`;
    }
  }

  public startAnimation(time: number) {
    let width = 0;
    const maxWidth = 100;
    const animate = () => {
      if (width >= maxWidth) {
        clearInterval(this.currentTimerAnimation);
      } else {
        width += 1;
        this.timerLineWidth = width;
      }
    };
    this.currentTimerAnimation = setInterval(animate, time * 10);
  }
}
