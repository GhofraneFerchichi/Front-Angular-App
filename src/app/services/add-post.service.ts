import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostPayload } from '../front/add-post/post-payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddPostService {

  constructor(private httpClient:HttpClient) {

  }
  uploadImage(file: File): Observable<PostPayload> {
    const endpoint = 'http://localhost:8181/api/posts/upload-image';
    const formData = new FormData();
    formData.append('image', file, file.name);
    return this.httpClient.post<PostPayload>(endpoint, formData);
  }
  addPost(postPayload:PostPayload){

    return this.httpClient.post('http://localhost:8181/api/posts',postPayload);
  }

  getAllPosts():Observable<Array<PostPayload>>{
    return this.httpClient.get<Array<PostPayload>>("http://localhost:8181/api/posts/all");
  }


  getPost(permaLink:Number):Observable<PostPayload>{
    return this.httpClient.get<PostPayload>('http://localhost:8181/api/posts/get/'+ permaLink);
  }



}
