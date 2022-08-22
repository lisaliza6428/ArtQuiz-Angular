import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureModalComponent } from '../components/modals/picture-modal/picture-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmModalComponent } from '../components/modals/confirm-modal/confirm-modal.component';
import { FinishModalComponent } from '../components/modals/finish-modal/finish-modal.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PictureModalComponent,
    ConfirmModalComponent,
    FinishModalComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSliderModule,
    RouterModule,
  ],
  exports: [MatDialogModule, MatButtonModule, MatSliderModule],
})
export class NgMaterialModule {}
