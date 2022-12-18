import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { SortPipe } from './pipes/sort.pipe';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [HeaderComponent, SortPipe, SearchPipe],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, SortPipe, SearchPipe],
})
export class SharedModule {}
