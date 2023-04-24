import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpEvent,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from '../models/product';
import { Comment } from '../models/comment';
import { User } from '../models/user';



  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  @Injectable({
    providedIn: 'root',
  })
  export class ProductService {
    baseUrl = 'http://localhost:8181/product';
    product: Product = new Product();
  
    public dataForm!: FormGroup;
  
    constructor(private httpClient: HttpClient) {}
    storageUserAsStr: any = localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser') || '{}')
      : null;
  
    getProductList(): Observable<Product[]> {
      return this.httpClient.get<Product[]>(this.baseUrl + '/products');
    }
    getProductById(id: number): Observable<Product> {
      return this.httpClient.get<Product>(`${this.baseUrl}/find/` + id);
    }
  
    addTask(formData: FormData): Observable<any> {
      return this.httpClient.post(this.baseUrl + '/addproduct', formData);
    }
  
    updateTask(formData: FormData): Observable<any> {
      return this.httpClient.post(this.baseUrl + '/update', formData);
    }
    deleteProduct(product: Product): Observable<Product> {
      const url = `${this.baseUrl}/delete/${product.id}`;
      return this.httpClient.delete<Product>(url);
    }
  
    post_options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    getImagesByProducts(id: number): Observable<any[]> {
      return this.httpClient.get<any[]>(this.baseUrl + '/images/' + id);
    }
    getProductByCategory(id: number): Observable<Product[]> {
      return this.httpClient.get<Product[]>(this.baseUrl + '/catproducts/' + id);
    }
  
    etoile(prodid: number, clientid: number, rev: string): Observable<any> {
      return this.httpClient.get<any>(
        this.baseUrl + '/add-etoile/' + prodid + '/' + clientid + '/' + rev
      );
    }
  
    addCom(c: Comment): Observable<Comment> {
      return this.httpClient.post<Comment>(
        'http://localhost:8181/comment/add-commentaire',
        c
      );
    }
  
    modifyCom(c: Comment): Observable<Comment> {
      return this.httpClient.put<Comment>(
        'http://localhost:8181/comment/modify-commentaire',
        c
      );
    }
  
    deleteCom(id: any) {
      return this.httpClient.delete<Comment>(
        'http://localhost:8181/comment/remove-client/' + id
      );
    }
  
    getByIDCom(idc: number): Observable<Comment> {
      return this.httpClient.get<Comment>(
        'http://localhost:8181/comment/retrieve-commentaire/' + idc
      );
    }
  
    getByIDComUser(idc: number): Observable<User> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.storageUserAsStr.token}`,
        }),
        withCredentials: true,
      };
      return this.httpClient.get<User>(
        'http://localhost:8181/comment/getUser/' + idc,
        httpOptions
      );
    }
  }
  
