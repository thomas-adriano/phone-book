import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByFirstLetter'
})
export class FilterByFirstLetterPipe implements PipeTransform {
  transform(value: any, args?: string): any {
    return value.filter(e => e.name.startsWith(args));
  }
}
