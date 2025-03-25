
import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Product } from '../models/product.model';

describe('ProductService (Pruebas del Taller de Droides)', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería obtener droides (Electronics)', () => {
    const mockDroids: Product[] = [{
      id: 1,
      title: 'Protocol Droid',
      price: 1500,
      description: 'Droide de protocolo C-3PO',
      category: 'Electronics',
    }];

    service.getProducts().subscribe(droids => {
      expect(droids[0].category).toBe('Electronics');
    });

    const req = httpMock.expectOne(apiUrl);
    req.flush([{
      ...mockDroids[0],
      category: 1 
    }]);
  });

  it('debería crear sables de luz (Electronics)', () => {
    const newLightSaber: Product = {
      title: 'Lightsaber Blue',
      price: 5000,
      description: 'Sable de luz azul estilo Jedi',
      category: 'Electronics',
      id: 0,
    };

    service.createProduct(newLightSaber).subscribe();

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.body).toEqual({
      title: 'Lightsaber Blue',
      price: 5000,
      description: 'Sable de luz azul estilo Jedi',
      category: 1,
    });
    req.flush({...newLightSaber, category: 1});
  });

  it('debería eliminar armaduras (Clothes)', () => {
    service.deleteProduct(1).subscribe();
    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('debería manejar todas las categorías galácticas', () => {
    const galaxyProducts: Product[] = [
      {
        id: 1,
        title: 'Droid BB-8',
        price: 2999,
        description: 'Droide astromecánico',
        category: 'Electronics',
      },
      {
        id: 2,
        title: 'Túnica Jedi',
        price: 199,
        description: 'Túnica estándar Jedi',
        category: 'Clothes',
      }
    ];

    service.getProducts().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products[0].category).toBe('Electronics');
      expect(products[1].category).toBe('Clothes');
    });

    const getReq = httpMock.expectOne(apiUrl);
    getReq.flush([
      {...galaxyProducts[0], category: 1}, 
      {...galaxyProducts[1], category: 2}
    ]);


    const newProduct: Product = {
      title: 'Comlink',
      price: 199,
      description: 'Dispositivo de comunicación',
      category: 'Electronics',
      id: 0
    };

    service.createProduct(newProduct).subscribe();
    const postReq = httpMock.expectOne(apiUrl);
    expect(postReq.request.body).toEqual({
      ...newProduct,
      category: 1 
    });
    postReq.flush({...newProduct, category: 1});
  });
});