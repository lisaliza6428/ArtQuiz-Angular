import { Pipe, PipeTransform } from '@angular/core';
import { DataModel } from '../models/response';
import { DataService } from '../services/data.service';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  constructor(
   public dataService: DataService,
  ) {

  }

  transform(data: any, sort: string) {
    if (!data || !sort) return data;
    switch (sort) {
      case 'authorAZ': {
        return  [...data].sort((a: DataModel, b: DataModel) => a.authorEN.localeCompare(b.authorEN));
      }
      case 'authorZA': {
        return  [...data].sort((a: DataModel, b: DataModel) => b.authorEN.localeCompare(a.authorEN));
      }
      case 'pictureAZ': {
        return  [...data].sort((a: DataModel, b: DataModel) => a.nameEN.localeCompare(b.nameEN));
      }
      case 'pictureZA': {
        return  [...data].sort((a: DataModel, b: DataModel) => b.nameEN.localeCompare(a.nameEN));
      }
      case 'yearASC': {
        return  [...data].sort((a: DataModel, b: DataModel) => +a.year - +b.year);
      }
      case 'yearDESC': {
        return  [...data].sort((a: DataModel, b: DataModel) => +b.year - +a.year);
      }
      default: {
        return [...data];
      }
    }
    return null;
  }

}
