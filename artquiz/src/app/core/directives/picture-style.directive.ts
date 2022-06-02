// For score page
import { Directive, ElementRef, Input, Renderer2, OnInit   } from '@angular/core';
import { DataService } from '../services/data.service';

@Directive({
  selector: '[appPictureStyle]',
})
export class PictureStyleDirective implements OnInit {
  @Input('appPictureStyle') imageNum: any;


  constructor(
    private elementRef: ElementRef,
    private render: Renderer2,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    const answers = this.dataService.getAnswersArray();
    const answer = +answers[this.imageNum];
    if (answer !== 1) {
      this.render.setStyle(this.elementRef.nativeElement, 'filter', 'grayscale(100%)');
    }
  }
}
