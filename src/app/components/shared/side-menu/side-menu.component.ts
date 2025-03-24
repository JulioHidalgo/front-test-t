import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
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
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatBadgeModule,
    MatSidenavModule,
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
