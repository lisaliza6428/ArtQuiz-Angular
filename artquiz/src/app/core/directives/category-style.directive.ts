import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { QUESTIONS_COUNT } from '../shared/consts';

@Directive({
  selector: '[appCategoryStyle]',
})
export class CategoryStyleDirective implements OnInit {
  @Input('appCategoryStyle') public imageNum: number;

  constructor(
    private elementRef: ElementRef,
    private render: Renderer2,
    private dataService: DataService
  ) {
    this.imageNum = 0;
  }

  ngOnInit() {
    const answers = this.dataService.getAnswersArray();
    const score = +answers
      .slice(this.imageNum, this.imageNum + QUESTIONS_COUNT)
      .reduce((x: number, y: number) => +x + +y, 0);
    if (!score) {
      this.render.setStyle(
        this.elementRef.nativeElement,
        'filter',
        'grayscale(100%)'
      );
    }
  }
}
