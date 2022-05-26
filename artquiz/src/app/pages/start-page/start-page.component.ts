import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {

  constructor(
    public dataService: DataService,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  action(){
    this.dataService.setQuizType('artists');
    this.dataService.getCategoryImages();
    this.router.navigate(['/categories']);
  }

  action1(){
    this.dataService.setQuizType('pictures');
    this.dataService.getCategoryImages();
    this.router.navigate(['/categories']);
  }

}
