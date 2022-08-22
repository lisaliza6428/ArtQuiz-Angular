import { Pipe, PipeTransform } from '@angular/core';
import { DataModel } from '../../models/response';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(data: DataModel[], input: string) {
    if (!data || !input) return data;
    return [...data].filter(
      (x) =>
        x.authorEN.toLowerCase().includes(input.toLowerCase()) ||
        x.nameEN.toLowerCase().includes(input.toLowerCase())
    );
  }
}
