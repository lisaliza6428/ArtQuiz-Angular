import { Component, OnInit } from '@angular/core';
import { DataModel } from 'src/app/core/models/response';
import { DataService } from '../../core/services/data.service';




@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent implements OnInit {

 

  round!: DataModel[];

  currentIndex = 0;

  htmlStr = `<button class="button answer correct">1</button>
  <button class="button answer correct">2</button>
  <button class="button answer correct">3</button>
  <button class="button answer correct">4</button>`;


  constructor(
    public dataService: DataService,
  ) {
    this.round = this.dataService.round
  }

  ngOnInit(): void {
    this.dataService.roundChange.subscribe(value => {
      this.round = value;
    });
    console.log('hi');
  }

  generateQuestion(){



  }
}
