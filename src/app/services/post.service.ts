import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {PostModel} from '../models/post.model';
import {StaticService} from './static.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts = new Subject<PostModel[]>();
  public posts_$ = this.posts.asObservable();

  constructor(private http: HttpClient, private staticService: StaticService) {}

  /*
  * Cette methode récupères tous les posts depuis le backend;
  * */
  getPosts() {
    this.http.get(this.staticService.baseUrl + 'posts', this.staticService.httpOptions).subscribe(
      (response: PostModel[]) => {
        this.posts.next(response);
      }, (error) => {
        console.log(error);
      }
    );
    return this.posts_$;
  }

  getPost(id: number) {
   return this.http.get(this.staticService.baseUrl + 'posts/' + id, this.staticService.httpOptions);
  }

  savePost(post: PostModel) {
   return this.http.post(this.staticService.baseUrl + 'posts', post, this.staticService.httpOptions);
  }

  updatePost(post: PostModel) {
    return this.http.put(this.staticService.baseUrl + 'posts/' + post.id, post, this.staticService.httpOptions);
  }

  deletePost(id: number) {
    return this.http.delete(this.staticService.baseUrl + 'posts/' + id, this.staticService.httpOptions);
  }
}
