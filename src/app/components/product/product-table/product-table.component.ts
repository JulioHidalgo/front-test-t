import { Component, Input } from '@angular/core';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../../pipes/truncate.pipe';


@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss',
})
export class ProductTableComponent {
  @Input() products!: Product[];
}
