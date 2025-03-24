import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  putProducts(productId: number) {
    throw new Error('Method not implemented.');
  }
  putProduct(productId: number) {
    throw new Error('Method not implemented.');
  }

  private readonly apiUrl = `${environment.apiBaseURL}/products`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // editProduct(id: number, product: Product): Observable<void> {
  //   return this.http.put<void>(`${this.apiUrl}/${id}`, product);
  // }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
