import { Component } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { QuestionService } from '../../core/services/question.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PictureModalComponent } from 'src/app/core/components/modals/picture-modal/picture-modal.component';
import { DataModel } from 'src/app/core/models/response';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.scss'],
})
export class GalleryPageComponent {
  public currentPage: number;

  public itemsPerPage: number;

  public sortValue: string;

  public searchValue: string;

  constructor(
    public dataService: DataService,
    private questionService: QuestionService,
    private matDialog: MatDialog
  ) {
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.sortValue = 'authorAZ';
    this.searchValue = '';
  }

  public showDescription(picture: DataModel): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      question: false,
      gallery: true,
      picture: picture,
    };
    this.matDialog.open(PictureModalComponent, dialogConfig);
  }

  public changePicturesCount(e: Event): void {
    const value = (e.target as HTMLSelectElement).value;
    this.itemsPerPage = +value;
  }

  public sortPictures(e: Event): void {
    const value = (e.target as HTMLSelectElement).value;
    this.sortValue = value;
  }
}
