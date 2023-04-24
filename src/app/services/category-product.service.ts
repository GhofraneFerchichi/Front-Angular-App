import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryProduct } from '../models/category-product';

@Injectable({
  providedIn: 'root'
})
export class CategoryProductService {
  private baseUrl = "http://localhost:8181/category"
  constructor(private httpClient:HttpClient) { }

  getProductCategories(): Observable<CategoryProduct[]> {
    return this.httpClient.get<CategoryProduct[]>(this.baseUrl + '/all');
  }
  getCategoryById(id: number): Observable<CategoryProduct> {
    return this.httpClient.get<CategoryProduct>(`${this.baseUrl}/find/` + id);
  }
  addCategorie(category: CategoryProduct): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + '/add', category);
  }

  updateCategorie(
    category: CategoryProduct,
    id: number
  ): Observable<CategoryProduct> {
    return this.httpClient.put<CategoryProduct>(
      this.baseUrl + '/update/' + id,
      category
    );
  }

  deleteCategory(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + '/delete/' + id);
  }

  getCategoryByProduct(id: number): Observable<CategoryProduct[]> {
    return this.httpClient.get<CategoryProduct[]>(
      this.baseUrl + '/category/' + id
    );
  }

}

