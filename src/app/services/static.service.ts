import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StaticService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Basic ' + btoa('test:123456')
    })
  };
  baseUrl = 'http://localhost:8181/';
  constructor() { }
}
