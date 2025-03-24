export enum StatusColor {
  info = 'status-color-info',
  success = 'status-color-success',
  warning = 'status-color-warning',
  error = 'status-color-error',
  secondary = 'status-color-secondary',
  dark = 'status-color-dark',
}

// import { Pipe, PipeTransform } from '@angular/core';

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
