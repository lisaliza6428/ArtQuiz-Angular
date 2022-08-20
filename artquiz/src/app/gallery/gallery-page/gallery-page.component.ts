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
  currentPage = 1;

  itemsPerPage = 10;

  sortValue = 'authorAZ';

  searchValue = '';

  constructor(
    public dataService: DataService,
    public questionService: QuestionService,
    public matDialog: MatDialog
  ) {}

  showDescription(picture: DataModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      question: false,
      gallery: true,
      picture: picture,
    };
    this.matDialog.open(PictureModalComponent, dialogConfig);
  }

  changePicturesCount(e: Event) {
    const value = (e.target as HTMLSelectElement).value;
    this.itemsPerPage = +value;
  }

  sortPictures(e: Event) {
    const value = (e.target as HTMLSelectElement).value;
    this.sortValue = value;
  }
}
