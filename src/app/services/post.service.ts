import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {PostModel} from '../models/post.model';
import {StaticService} from './static.service';
import { PostPayload } from '../front/add-post/post-payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts = new Subject<PostModel[]>();
  public posts_$ = this.posts.asObservable();
  private baseUrll = 'http://localhost:8181/api/posts';

  constructor(private http: HttpClient, private staticService: StaticService) {}

  /*
  * Cette methode récupères tous les posts depuis le backend;
  * */
  getPosts() {
    
    this.http.get(this.staticService.baseUrl + 'api/posts', this.staticService.httpOptions).subscribe(
      (response: Object) => {
        const posts = response as PostModel[];
        this.posts.next(posts);
      }, (error) => {
        console.log(error);
      }
    );
    return this.posts_$;
  }
  getList(): Observable<any> {
    return this.http.get(`${this.baseUrll}`);
  }
  getOne(id: number): Observable<any> {
    return this.http.get(`${this.baseUrll}/get/${id}`);
  }

  getPost(id: number) {
   return this.http.get(this.staticService.baseUrl + 'api/posts/get/' + id, this.staticService.httpOptions);
  }

  savePost(post: PostModel) {
   return this.http.post(this.staticService.baseUrl + 'api/posts/', post, this.staticService.httpOptions);
  }

  updateOne(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrll}/edit/${id}`, value);
  }

  updatePost(post: PostModel) {
    return this.http.put<PostModel>(this.staticService.baseUrl + 'api/posts/edit/' + post.id, post, this.staticService.httpOptions);
  }
  
  deleteOne(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrll}/${id}`, { responseType: 'text' });
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrll}/${id}`, { responseType: 'text' });
  }
}
