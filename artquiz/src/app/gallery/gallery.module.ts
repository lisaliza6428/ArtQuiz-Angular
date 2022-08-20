import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryPageComponent } from './gallery-page/gallery-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { GalleryRoutingModule } from './gallery-routing.module';
import { SharedModule } from '../core/shared/shared.module';

@NgModule({
  declarations: [GalleryPageComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    GalleryRoutingModule,
    SharedModule,
  ],
})
export class GalleryModule {}
