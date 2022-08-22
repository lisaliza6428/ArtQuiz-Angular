import { DataModel } from '../models/response';

export function getRandomNumber(min: number, max: number): number {
  let minNum = min;
  let maxNum = max;
  minNum = Math.ceil(minNum);
  maxNum = Math.floor(maxNum);
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

export function shuffleArray(arr: DataModel[]): DataModel[] {
  const array = arr;
  let j;
  let temp;
  for (let i = arr.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    array[j] = arr[i];
    array[i] = temp;
  }
  return arr;
}
