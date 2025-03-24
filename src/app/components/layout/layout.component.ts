import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LoadingComponent } from '../shared/loading/loading.component';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  @Input() sideRight: boolean = false;
  isLoading: boolean = false;

  constructor(private loading: LoadingService) {}

  ngOnInit(): void {
    this.loading.isLoading$.subscribe((status) => {
      this.isLoading = status;
    });
  }
}
