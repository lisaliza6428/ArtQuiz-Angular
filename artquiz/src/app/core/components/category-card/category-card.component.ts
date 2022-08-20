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
  public imageNum: number;

  @Input()
  public index: number;

  public labelAgainClass: string;

  public score: string | number;

  public genres: string[];

  constructor(
    private dataService: DataService,
    private questionService: QuestionService,
    private router: Router
  ) {
    this.imageNum = 0;
    this.index = 0;
    this.labelAgainClass = '';
    this.score = 0;
    this.genres = GENRES;
  }

  ngOnInit(): void {
    this.defineCardView();
  }

  public checkClick(e: Event, index: number): void {
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

  private defineCardView(): void {
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
