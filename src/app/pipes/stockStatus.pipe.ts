import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stockStatus'
})
export class StockStatusPipe implements PipeTransform {

  transform(value: number, enumType: any): string {
    return Object.keys(enumType).find(key => enumType[key] === value) || '';
  }

}
