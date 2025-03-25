import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { StatusComponent } from '../../shared/status/status.component';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MaterialModule,
    ReactiveFormsModule,
    StatusComponent,
    
  ],
})
export class ProductListComponent implements OnInit {
  productlist!: Product[];
  dataSource = new MatTableDataSource<Product>([]);
  displayedColumns: string[] = ["title", "description", "price", "category", "status", "actions"];
  @Input() products: Product[] = [];
  searchText: string = '';
  @ViewChild(PopupComponent) popup!: PopupComponent;
  

  form: FormGroup;
  private fb = inject(FormBuilder); 
  http: any;

  constructor(private productService: ProductService, private dialog: MatDialog) {
    this.loadProducts();
    this.form = this.fb.group({
      search: ['']
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error('Error al cargar los productos', err);
      }
    });
  }

  editProduct(productId: number, productData?: any): Observable<any> {
    return this.http.put(`api/products/${productId}`, productData);
  }

  
  deleteProduct(productId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.products = this.products.filter(product => product.id !== productId);
          this.dataSource.data = this.products;
          console.log('Producto eliminado correctamente');
        },
        error: (err: any) => {
          console.error('Error eliminando producto', err);
        }
      });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  

  addproduct() {
    this.Openpopup(0, 'Agregar Producto', PopupComponent);
  }

  Openpopup(code: any, title: any, component: any) {
    var _popup = this.dialog.open(component, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        code: code
      }
    });
    _popup.afterClosed().subscribe(() => {
      this.loadProducts();
    });
  }
}


