import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { GENRES } from '../../core/consts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {

  genres = GENRES;

  images!: number[];

  constructor(
    public dataService: DataService,
    public router: Router,
  ) {
    this.images = dataService.images;
  }

  ngOnInit(): void {
    this.dataService.imagesChange.subscribe(value => {
      this.images = value;
    });
  }

  checkClick(e: Event, id: number){
    const className = (e.target as HTMLElement).className;
    if (className.includes('card__image') || className.includes('card__label')){
      this.dataService.getRoundData(id);
      this.router.navigate(['/question'])
    }

    if (className.includes('card__score')){
      this.dataService.getRoundData(id);
      this.router.navigate(['/score'])
    }
  }
}
