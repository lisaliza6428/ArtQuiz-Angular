import { Component, Input, OnInit } from '@angular/core';
import { GENRES, QUESTIONS_COUNT } from '../../shared/consts';
import { DataService } from '../../services/data.service';
import { QuestionService } from '../../services/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent implements OnInit {
  @Input()
  imageNum!: number;

  @Input()
  index!: number;

  labelAgainClass!: string;

  score!: string | number;

  genres = GENRES;

  constructor(
    public dataService: DataService,
    public questionService: QuestionService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.defineCardView();
  }

  checkClick(e: Event, index: number) {
    const className = (e.target as HTMLElement).className;
    if (
      className.includes('card__image') ||
      className.includes('card__label')
    ) {
      this.dataService.getRoundData(index);
      this.router.navigate(['/question']);
      this.questionService.generateQuestion();
    }

    if (className.includes('card__score')) {
      this.dataService.getRoundData(index);
      this.router.navigate(['/score']);
    }
  }

  defineCardView() {
    const answers = this.dataService.getAnswersArray();
    const results = answers
      .slice(this.imageNum, this.imageNum + QUESTIONS_COUNT)
      .reduce((x: number, y: number) => +x + +y, 0);
    if (results) {
      this.labelAgainClass = '';
      this.score = `${results}/${QUESTIONS_COUNT}`;
    } else {
      this.labelAgainClass = 'none';
      this.score = '';
    }
  }
}
