import { Injectable } from '@angular/core';
import { QuestionService } from './question.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class ModalActionsService {
  constructor(
    public questionService: QuestionService,
    public dataService: DataService
  ) {}

  modalAction(modalData: any) {
    switch (modalData.modal) {
      case 'leaveQuestion':
        this.questionService.quitQuiz();
        break;

      case 'resetProgress':
        this.dataService.clearAnswersArray();
        break;

      default:
        break;
    }
  }

  modalCancelAction(modalData: any) {
    switch (modalData.modal) {
      case 'leaveQuestion':
        if (this.questionService.timer) {
          const time = this.dataService.getSettings().timerValue;
          this.questionService.startTimer(+time);
        }
        break;

      case 'resetProgress':
        break;

      default:
        break;
    }
  }
}
