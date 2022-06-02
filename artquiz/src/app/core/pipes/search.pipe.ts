import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {

  transform(data: any, input: string) {
    if (!data || !input) return data;
    return  [...data].filter(x => x.authorEN.toLowerCase().includes(input) || x.nameEN.toLowerCase().includes(input));
  }
}
