import { Injectable } from '@angular/core';
import { DataModel } from '../models/response';
import { Subject } from 'rxjs';
import { QUESTIONS_COUNT } from '../consts';
import { shuffleArray } from '../functions';
import { HttpClient } from '@angular/common/http';




@Injectable({
  providedIn: 'root',
})

export class DataService {

  quiz = '';

  data!: DataModel[];

  dataChange: Subject<DataModel[]> = new Subject<DataModel[]>();

  round!: DataModel[];

  roundChange: Subject<DataModel[]> = new Subject<DataModel[]>();

  images!: number[];

  imagesChange: Subject<number[]> = new Subject<number[]>();

  answersArray!: number[];

  defaultSettings = {
    volume: 0.2,
    timer: true,
    timerValue: 20,
  };

  constructor(
    public http: HttpClient,
  ) {
    this.imagesChange.subscribe((value) => {
      this.images = value;
    });
    this.roundChange.subscribe((value) => {
      this.round = value;
    });
    this.dataChange.subscribe((value) => {
      this.data = value;
    });
    this.getData();
  }

  getQuizType() {
    const quiz = localStorage.getItem('quiz');
    if (quiz !== null) {
      this.quiz = quiz;
    } else {
      this.quiz = '';
    }
  }

  setQuizType(quiz: string) {
    localStorage.setItem('quiz', quiz);
    this.getQuizType();
  }

  getData() {
    this.http.get<DataModel[]>('./assets/data.json').subscribe((data) => {
      this.data = data;
    });

  }

  getRoundData(categoryIndex: number) {
    if (this.quiz === 'artists') {
      this.round = this.data.slice(
        categoryIndex * QUESTIONS_COUNT,
        categoryIndex * QUESTIONS_COUNT + QUESTIONS_COUNT,
      );
    } else {
      this.round = this.data.slice(
        categoryIndex * QUESTIONS_COUNT + 120,
        categoryIndex * QUESTIONS_COUNT + QUESTIONS_COUNT + 120,
      );
    }
    this.round = shuffleArray(this.round);
    this.roundChange.next(this.round);
  }

  getCategoryImages() {
    let start = 0;
    if (this.quiz === 'artists') {
      start = 0;
    } else {
      start = Math.floor(this.data.length / 2) ;
    }

    const imageNums = new Array(12).fill(start).map((x: number, i) => x + 10 * i);
    this.imagesChange.next(imageNums);
  }

  getAnswersArray() {
    const arr = localStorage.getItem('answersArray');
    if (arr !== null) return JSON.parse(arr);
    return new Array(240).fill('0');
  }

  setAnswersArray(array: number[]) {
    localStorage.setItem('answersArray', JSON.stringify(array));
  }

  clearAnswersArray() {
    localStorage.setItem('answersArray', JSON.stringify(Array(240).fill('0')));
  }

  getSettings() {
    const settings = localStorage.getItem('settings');
    if (settings !== null) return JSON.parse(settings);
    return this.defaultSettings;
  }

  setSettings(settings: any) {
    localStorage.setItem('settings', JSON.stringify(settings));
  }

  setDefaultSettings() {
    localStorage.setItem('settings', JSON.stringify(this.defaultSettings));
  }

  updateSettings(field: string, value: any) {
    const settings = this.getSettings();
    settings[field] = value;
    this.setSettings(settings);
  }

}
