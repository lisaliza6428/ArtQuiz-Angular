import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-score-page',
  templateUrl: './score-page.component.html',
  styleUrls: ['./score-page.component.scss']
})
export class ScorePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showDescription(e: Event){
    console.log(e.target);
    (e.target as HTMLElement).classList.toggle('none');

  }

}
