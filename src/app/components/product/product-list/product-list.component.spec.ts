import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../../services/product.service';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ProductListComponent (Pruebas de la Federación de Comercio)', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: jasmine.SpyObj<ProductService>;

  const mockProducts = [
    { id: 1, title: 'Droid X-1', price: 299, description: 'Droid de protocolo', category: 'Electronics', images: ['droid.jpg'] },
    { id: 2, title: 'Jedi Robe', price: 89, description: 'Túnica elegante', category: 'Clothes', images: ['robe.jpg'] }
  ];

  beforeEach(() => {
    productService = jasmine.createSpyObj('ProductService', ['getProducts', 'deleteProduct']);
    productService.getProducts.and.returnValue(of(mockProducts));

    TestBed.configureTestingModule({
      imports: [MatTableModule],
      providers: [
        { provide: ProductService, useValue: productService },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería cargar productos como un carguero Neimoidiano', () => {
    expect(component.products.length).toBe(2);
    expect(component.products[0].category).toBe('Electronics');
  });

  it('debería mostrar categorías correctamente', () => {
    const categories = component.products.map(p => p.category);
    expect(categories).toContain('Electronics');
    expect(categories).toContain('Clothes');
  });

  it('debería eliminar productos como un cazarrecompensas eficiente', () => {
    productService.deleteProduct.and.returnValue(of(void 0));
    component.deleteProduct(1);
    expect(productService.deleteProduct).toHaveBeenCalledWith(1);
  });
});
