import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { ProductListComponent } from '../../product/product-list/product-list.component';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';

interface MenuItem {
  label: string;
  link: string;
  icon?: string;
}

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MaterialModule,
    ProductListComponent,
    RouterOutlet,
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent implements OnInit {
  menu: MenuItem[] = [
    {
      label: 'Home',
      link: '/home',
      icon: 'home',
    },
    {
      label: 'Create',
      link: '/create',
      icon: 'add',
    },
  ];

  products: Product[] = []; 
  badgevisible = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts(); 
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data; 
      },
      error: (err) => {
        console.error('Error loading products', err);
      },
    });
  }

  badgevisibility(): void {
    this.badgevisible = true;
  }
}
