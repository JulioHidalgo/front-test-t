import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = `${environment.apiBaseURL}/products`;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Crear un producto 
  createProduct(productData: Omit<Product, 'id'>, images: string[] = []): Observable<Product> {
    const categoryNameToId: Record<string, number> = {
      'Clothes': 1,
      'Electronics': 2,
      'Furniture': 3,
      'Toys': 4,
      'Others': 5
    };
  
    const requestBody = {
      title: productData.title,
      price: productData.price,
      description: productData.description,
      categoryId: categoryNameToId[productData.category] || 5,
      images: images
    };
  
    return this.http.post<Product>(this.apiUrl, requestBody);
  }

  // Actualizar un producto 
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  // Eliminar un producto
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Buscar productos
  searchProducts(term: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/search?q=${term}`);
  }
}