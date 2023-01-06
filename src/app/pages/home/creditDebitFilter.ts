import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditDebitFilter'
})
export class CreditDebitFilterPipe implements PipeTransform {
  transform(items: any[], type: string): any[] {
    if (!items) return [];
    if (!type) return items;
    return items.filter(item => item.type === type);
  }
}
