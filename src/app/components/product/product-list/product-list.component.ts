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
import { signal, computed } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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


  filterTerm = signal('');

  constructor(private productService: ProductService, private dialog: MatDialog) {
    this.loadProducts();
    this.form = this.fb.group({
      search: ['']
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.configureFilterPredicate();
    this.form.get('search')?.valueChanges
  .pipe(
    debounceTime(300),
    distinctUntilChanged()
  )
  .subscribe(value => {
    this.dataSource.filter = value.trim().toLowerCase();
  });
  }

  

  private configureFilterPredicate(): void {
    this.dataSource.filterPredicate = (data: Product, filter: string) => {
      const normalizedFilter = filter.trim().toLowerCase();
      return (
        data.title.toLowerCase().includes(normalizedFilter) ||
        (data.description && data.description.toLowerCase().includes(normalizedFilter)) ||
        data.price.toString().includes(normalizedFilter)
      );
    };
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
    this.filterTerm.set(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addproduct(): void {
    this.openProductPopup({ 
      title: 'Agregar Producto', 
      code: 0 
    });
  }
  
  editProduct(id: number, product: Product): void {
    this.openProductPopup({ 
      title: 'Editar Producto', 
      code: id,
      productData: product 
    });
  }
  
  private openProductPopup(data: any): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '600px',
      data: data
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.refreshProducts();
      }
    });
  }
  
  private refreshProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.dataSource.data = products;
    });
  }

  // addproduct() {
  //   this.Openpopup(0, 'Agregar Producto', PopupComponent);
  // }

  // editProduct(id: number, product: Product): void {
  //   this.Openpopup({ 
  //     title: 'Editar Producto', 
  //     code: id,
  //     productData: product 
  //   });
  // }

  // Openpopup(code: any, title: any, component: any) {
  //   const _popup = this.dialog.open(component, {
  //     width: '40%',
  //     enterAnimationDuration: '1000ms',
  //     exitAnimationDuration: '1000ms',
  //     data: {
  //       title: title,
  //       code: code
  //     }
  //   });
  //   _popup.afterClosed().subscribe(() => {
  //     this.loadProducts();
  //   });
  // }
}