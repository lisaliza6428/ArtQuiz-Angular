import { Component } from '@angular/core';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
})
export class CategoriesPageComponent {
  constructor(public dataService: DataService) {}
}
