import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { StatusColor } from '../../shared/status/status-color';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
})
export class StatusComponent {
  @Input() data!: string | number;
  @Input() statusColor: StatusColor = StatusColor.info;
  status: any;
}


