import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent {
  constructor(private dataService: DataService, private router: Router) {}

  public openArtistsQuiz() {
    this.dataService.setQuizType('artists');
    this.dataService.getCategoryImages();
    this.router.navigate(['/categories']);
  }

  public openPicturesQuiz() {
    this.dataService.setQuizType('pictures');
    this.dataService.getCategoryImages();
    this.router.navigate(['/categories']);
  }
}
