import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PostModel} from '../../models/post.model';
import {PostService} from '../../services/post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-todos',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, AfterViewInit {

  posts: PostModel[] = [];
  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.postService.getPosts();
  }

  ngAfterViewInit(): void {
    this.postService.posts_$.subscribe(
      (posts: PostModel[]) => {
        this.posts = posts;
      }
    );
  }

  onShowComments(id: number) {
    this.router.navigate(['/posts/' + id]);
  }

  onCreatePost() {
    this.router.navigate(['/posts/create']);
  }
}
