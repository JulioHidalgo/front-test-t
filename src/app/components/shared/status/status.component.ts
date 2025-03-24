import { Component, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-price-status',
  standalone: true,
  imports: [CommonModule, MatChipsModule, MatIconModule, MatTooltipModule],
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {
  @Input() price: number = 0;
  @Input() showText: boolean = true;
  @Input() showIcon: boolean = false;

  get statusInfo() {
    if (this.price <= 0) return { 
      text: 'Inválido', 
      icon: 'error',
      colorClass: 'gray-chip'
    };
    if (this.price <= 100) return { 
      text: 'Barato', 
      icon: 'attach_money',
      colorClass: 'green-chip'
    };
    if (this.price <= 500) return { 
      text: 'Medio', 
      icon: 'local_offer',
      colorClass: 'yellow-chip'
    };
    return { 
      text: 'Caro', 
      icon: 'money_off',
      colorClass: 'red-chip'
    };
  }
}



