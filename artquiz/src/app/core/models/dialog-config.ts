import { DataModel } from './response';

export interface DialogConfigModel {
  question?: boolean;
  gallery?: boolean;
  isCorrect?: string;
  score?: number;
  picture?: DataModel;
}

export interface DialogConfigConfirmModel {
  modal: string;
  message: string;
  actionButtonText: string;
  cancelButtonText: string;
}
