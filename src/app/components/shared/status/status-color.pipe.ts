import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusColor'
})
export class StatusColorPipe implements PipeTransform {
  transform(price: number): string {
    if (price <= 0) return 'gray'; 
    if (price <= 100) return 'green'; 
    if (price <= 500) return 'yellow';
    return 'red';
  }
}