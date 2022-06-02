import { Component } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { GENRES, QUESTIONS_COUNT } from '../../core/consts';
import { Router } from '@angular/router';
import { QuestionService } from '../../core/services/question.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
})
export class CategoriesPageComponent {
  genres = GENRES;

  images!: number[];

  none = 'none';

  constructor(
    public dataService: DataService,
    public router: Router,
    public questionService: QuestionService
  ) {}

  checkClick(e: Event, id: number) {
    const className = (e.target as HTMLElement).className;
    if (
      className.includes('card__image') ||
      className.includes('card__label')
    ) {
      this.dataService.getRoundData(id);
      this.router.navigate(['/question']);
      this.questionService.generateVariants();
    }

    if (className.includes('card__score')) {
      this.dataService.getRoundData(id);
      this.router.navigate(['/score']);
    }
  }

  getScore(imageNum: number) {
    const arr = this.dataService.getAnswersArray();
    const results = arr
      .slice(imageNum, imageNum + QUESTIONS_COUNT)
      .reduce((x: number, y: number) => +x + +y, 0);
    if (results) {
      this.none = '';
      return `${results}/10`;
    }
    this.none = 'none';
    return '';
  }
}
