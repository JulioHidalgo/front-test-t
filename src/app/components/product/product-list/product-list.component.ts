import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
// import { StatusComponent } from '../../shared/status/status.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginator} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";

// import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    // StatusComponent, 
    RouterModule, 
    CommonModule,
    MatTableModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatPaginator,
    MatCardModule,
                   ],
})
export class ProductListComponent implements OnInit {

  productlist !: Product[];
  dataSource: any;
  displayedColumns: string[] = ["title", "description", "price", "category", "status", "actions"];
  @Input() products: Product[] = [];
  searchText: string = '';
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

addproduct() {
throw new Error('Method not implemented.');
}

  constructor(private productService: ProductService, private dialog: MatDialog) {
    this.loadProducts();
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error al cargar los productos', err);
      }
    });
  }

  editProduct(productId: number): void {
    // this.productService.putProduct(productId).subscribe({
    //   next: () => {
    //     this.products = this.products.filter(product => product.id !== productId);
    //     console.log('Producto editado correctamente');
    //   },
    //   error: (err: any) => {
    //     console.error('Error editando producto', err);
    //   }
    // });
    // console.log('Edit product with ID:', productId);

  }

  deleteProduct(productId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.products = this.products.filter(product => product.id !== productId);
          console.log('Producto eliminado correctamente');
        },
        error: (err: any) => {
          console.error('Error eliminando producto', err);
        }
      });
    }
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.searchText = filterValue;
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  Openpopup(code: any, title: any,component:any) {
    var _popup = this.dialog.open(component, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        code: code
      }
    });
    _popup.afterClosed().subscribe(item => {
      // console.log(item)
      this.loadProducts();
    })
  }
}
