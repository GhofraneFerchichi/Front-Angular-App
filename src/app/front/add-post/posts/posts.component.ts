import {AfterViewInit, Component, OnInit} from '@angular/core';
import { PostpostModel } from 'src/app/models/post';
import {PostService} from '../../../services/post.service';
import {Router} from '@angular/router';
import {EditorModule} from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-todos',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, AfterViewInit {

  posts: PostpostModel[] = [];
  constructor(private postService: PostService,
     private router: Router) { }

  ngOnInit() {
    this.postService.getList();
  }

  ngAfterViewInit(): void {
    this.postService.posts_$.subscribe(
      (posts: PostpostModel[]) => {
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
