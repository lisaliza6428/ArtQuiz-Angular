import { Injectable } from '@angular/core';
import { DataModel } from '../models/response';
import { Subject } from 'rxjs';
import { QUESTIONS_COUNT } from '../consts';




@Injectable({
  providedIn: 'root'
})
export class DataService {

  quiz = '';

  data!: DataModel[];

  round!: DataModel[];

  roundChange: Subject<DataModel[]> = new Subject<DataModel[]>();

  images!: number[];

  imagesChange: Subject<number[]> = new Subject<number[]>();

  constructor() {
    this.imagesChange.subscribe((value) => {
      this.images = value;
    });
    this.roundChange.subscribe((value) => {
      this.round = value;
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

  async getData(){
    const responce = await fetch('./assets/data.json');
    const data = await responce.json();
    this.data = data;
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
    console.log(this.round);
    this.roundChange.next(this.round);
  }

  getCategoryImages() {
    let start = 0;
    if (this.quiz === 'artists') {
      start = 0;
    } else {
      start = Math.floor(this.data.length / 2) ;
    }

    const imageNums = new Array(12).fill(start).map((x: number, i) => x + 10*i);
    this.imagesChange.next(imageNums)
  }
}
