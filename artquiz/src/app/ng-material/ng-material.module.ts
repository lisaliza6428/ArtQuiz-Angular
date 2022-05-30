import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../core/components/modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSliderModule} from '@angular/material/slider'
import {MatButtonModule} from '@angular/material/button';
import { ConfirmModalComponent } from '../core/components/confirm-modal/confirm-modal.component';
import { FinishModalComponent } from '../core/components/finish-modal/finish-modal.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    ModalComponent,
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
  exports: [
    MatDialogModule,
    MatButtonModule,
    MatSliderModule,
  ],
})
export class NgMaterialModule { }
