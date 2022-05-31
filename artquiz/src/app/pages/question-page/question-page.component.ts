import { Component, AfterViewInit, OnInit, OnDestroy, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { DataModel } from 'src/app/core/models/response';
import { DataService } from '../../core/services/data.service';
import { getRandomNumber, shuffleArray } from '../../core/functions';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { ConfirmModalComponent } from '../../core/components/confirm-modal/confirm-modal.component';
import { QuestionService } from '../../core/services/question.service';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class QuestionPageComponent implements AfterViewInit, OnInit, OnDestroy, OnChanges {

  constructor(
    public dataService: DataService,
    public questionService: QuestionService,
    public matDialog: MatDialog,
  ) {
    console.log('constructor');

  }
  openConfirmModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      message: 'Are you sure you want to leave?',
      actionButtonText: 'Yes, leave',
      cancelButtonText: 'Cancel',
    };
    this.matDialog.open(ConfirmModalComponent, dialogConfig);
  }

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  ngAfterViewInit() {
    console.log('AfterViewInit');
  }

  ngOnDestroy() {
    console.log('OnDestroy');
  }


  ngOnChanges() {
    console.log('ngOnChanges');
  }

  ngDoCheck(){
    console.log('ngDoCheck');
  }
}
