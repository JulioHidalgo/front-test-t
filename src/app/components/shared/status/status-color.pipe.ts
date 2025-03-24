import { Pipe, PipeTransform } from '@angular/core';
import { StatusColor } from './status-color';

@Pipe({
  name: 'statusColor',
  standalone: true,
})
export class StatusColorPipe implements PipeTransform {
  transform(value: (...args: any[]) => StatusColor, ...args: any[]): StatusColor {
    return value(...args);
  }
}


// import { Pipe, PipeTransform } from '@angular/core';
// import { StatusColor } from '../../shared/status/status-color';

// @Pipe({
//   name: 'statusColor',
//   standalone: true
// })
// export class StatusColorPipe implements PipeTransform {
//   transform(price: number): string {
//     if (price > 0 && price <= 100) {
//       return 'barato';
//     } else if (price > 100 && price <= 500) {
//       return 'medio';
//     } else if (price > 500) {
//       return 'caro';
//     } else {
//       return 'desconocido';
//     }
//   }
// }
