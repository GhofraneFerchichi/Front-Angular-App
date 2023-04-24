import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AddPostService } from '../../../app/services/add-post.service';
import { PostPayload } from '../add-post/post-payload';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { PostpostModel } from 'src/app/models/post';

@Component({
  selector: 'app-homepost',
  templateUrl: './homepost.component.html',
  styleUrls: ['./homepost.component.css',
  '../../../assets/front/css/style.css',
  '../../../assets/front/css/slick.css',
  '../../../assets/front/css/responsive.css',
  '../../../assets/front/css/nice-select.css',
  '../../../assets/front/css/magnific-popup.css',
  '../../../assets/front/css/jquery.nice-number.min.css',
  '../../../assets/front/css/font-awesome.min.css',
  '../../../assets/front/css/default.css',
  '../../../assets/front/css/bootstrap.min.css',
  '../../../assets/front/css/animate.css' ,
],
encapsulation: ViewEncapsulation.None,
})
export class HomepostComponent implements OnInit {


  posts!: Observable<Array<PostPayload>>;
  
  constructor(private addpostService:AddPostService,
    private router: Router,
    private postService: PostService) { }

  ngOnInit(): void {

    this.reloadData();

   
  }

  reloadData() {
   this.posts=this.addpostService.getAllPosts();  }

  deleteOne(id: number) {
    this.postService.deleteOne(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
  onShowComments(id: number) {
    this.router.navigate(['/posts/' + id]);
  }

  onCreatePost() {
    this.router.navigate(['/posts/create']);
  }
}





