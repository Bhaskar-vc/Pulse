import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOut',
})
export class FilterOutPipe implements PipeTransform {
  transform<T>(items: T[], predicate: (item: T) => boolean): T[] {
    if (!items || !predicate) {
      return items;
    }
    return items.filter((item) => !predicate(item));
  }
}
