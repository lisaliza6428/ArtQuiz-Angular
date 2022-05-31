import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { DataModel } from 'src/app/core/models/response';

@Component({
  selector: 'app-score-page',
  templateUrl: './score-page.component.html',
  styleUrls: ['./score-page.component.scss']
})
export class ScorePageComponent implements OnInit {

  constructor(
    public dataService: DataService,
    public matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  showDescription(picture: DataModel){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      question: false,
      gallery: true,
      answer: picture,
    };
    this.matDialog.open(ModalComponent, dialogConfig);

  }

}
