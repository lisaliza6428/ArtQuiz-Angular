import { Injectable, OnInit } from '@angular/core';
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
export class QuestionService implements OnInit {

  timer = true;
  timerChange: Subject<boolean> = new Subject<boolean>();
  timerSec = '';
  timerSecChange: Subject<string> = new Subject<string>();
  round!: DataModel[];
  variants!: DataModel[];
  variantsChange: Subject<DataModel[]> = new Subject<DataModel[]>();
  rightAnswer!: DataModel;
  rightAnswerChange: Subject<DataModel> = new Subject<DataModel>();
  currentIndex = 0;
  currentIndexChange: Subject<number> = new Subject<number>();
  roundAnswers: number[] = new Array(10).fill(0);
  roundAnswersChange: Subject<number[]> = new Subject<number[]>();
  currentTimer!: any;
  currentTimerAnimation!: any;
  timerLineWidth = 0;

  constructor(
    public dataService: DataService,
    public router: Router,
    public matDialog: MatDialog,
  ) {
    this.round = this.dataService.round;
    this.timerSec = this.dataService.getSettings().timerValue;
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
    this.timerSecChange.subscribe((value: string) => {
      this.timerSec = value;
    });
  }

  ngOnInit(): void {
    this.timerSec = this.dataService.getSettings().timerValue;

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
    this.timerSec = this.dataService.getSettings().timerValue;
    this.variantsChange.next(random);
    if (this.timer) {
      this.startTimer(+this.timerSec);
    }
  }

  public quitQuiz(){
    this.timerLineWidth = 0;
    this.currentIndexChange.next(0);
    this.roundAnswersChange.next(new Array(10).fill(0));
    this.router.navigate(['/categories'])
  }

  public checkFinish(){
    this.timerLineWidth = 0;
    let index = this.currentIndex + 1;
    if (index === 10) {
      this.finishRoundActions();
    } else {
      this.currentIndexChange.next(index);
      this.generateVariants();
    }
  }

  checkAnswer(e: Event, answer: number) {
    this.checkTimer();
    let isCorrect = '';
    if (+this.rightAnswer.imageNum === answer) {
      (e.target as HTMLElement).classList.add('correct');
      isCorrect = 'correct';
      this.getSound('correct');
      this.roundAnswers[this.currentIndex] = 1;
      this.roundAnswersChange.next(this.roundAnswers);
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

  checkTimer() {
    if (this.timer) {
      clearInterval(this.currentTimer);
      clearInterval(this.currentTimerAnimation);
    }
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

  timeIsOver() {
    this.getSound('wrong');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      question: true,
      gallery: false,
      answer: this.rightAnswer,
      isCorrect: 'wrong',
    };
    this.matDialog.open(ModalComponent, dialogConfig);
  }


  startTimer(t: number) {
    let time = t;
    this.progressAnimation(time);
    const timer = () => {
      time -= 1;
      if (time <= 0) {
        this.checkTimer()
        this.timeIsOver();
        this.timerSecChange.next(`0${0}`);
      } else if (time <= 9) {
        this.timerSecChange.next(`0${time}`);
      } else {
        this.timerSecChange.next(`${time}`);
      }
    };
    this.currentTimer = setInterval(timer, 1000);
  }

  progressAnimation(time: number) {
    let width = this.timerLineWidth;
    const animate = () => {
      if (width >= 100) {
        clearInterval(this.currentTimerAnimation);
      } else {
        width += 1;
        this.timerLineWidth = width;
      } 
    }
    this.currentTimerAnimation = setInterval(animate, time * 10);
  }
}
