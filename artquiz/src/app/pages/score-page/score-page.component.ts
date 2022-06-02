import { Component } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PictureModalComponent } from '../../core/components/modals/picture-modal/picture-modal.component';
import { DataModel } from 'src/app/core/models/response';

@Component({
  selector: 'app-score-page',
  templateUrl: './score-page.component.html',
  styleUrls: ['./score-page.component.scss'],
})
export class ScorePageComponent {

  constructor(
    public dataService: DataService,
    public matDialog: MatDialog,
  ) { }

  showDescription(picture: DataModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      question: false,
      gallery: true,
      answer: picture,
    };
    this.matDialog.open(PictureModalComponent, dialogConfig);
  }

}
