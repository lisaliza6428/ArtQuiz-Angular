import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { QuestionService } from '../../core/services/question.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { DataModel } from 'src/app/core/models/response';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.scss']
})
export class GalleryPageComponent implements OnInit {

  none = 'none';

  constructor(
    public dataService: DataService,
    public questionService: QuestionService,
    public matDialog: MatDialog,
  ) {

  }

  ngOnInit(): void {

  }



  showDescription(n: DataModel){
    console.log(n);
    //(e.target as HTMLElement).classList.toggle('none');

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      question: false,
      gallery: true,
      answer: n,
      //isCorrect: isCorrect,
    };
    this.matDialog.open(ModalComponent, dialogConfig);

  }

}
