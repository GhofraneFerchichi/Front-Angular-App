import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../../../services/post.service';
import { PostpostModel } from 'src/app/models/post'; 
import { CommentModel } from 'src/app/models/comment.model';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-posts-show',
  templateUrl: './posts-show.component.html',
  styleUrls: ['./posts-show.component.css']
})
export class PostsShowComponent implements OnInit {
  post!: PostpostModel;
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private router: Router
    ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.postService.getOne(id).subscribe(
      (receivedPost: PostpostModel) => {
          this.post = receivedPost;
      },
      (error) => {
          console.log(error);
      },
      () => {
        // complete.
    });
  }

  onDelete(id: number) {
    this.postService.deletePost(id).subscribe(
      (response: any) => {
         console.log(response);
         console.log('Cool');
        this.router.navigate(['/todos']);
      }, (error) => {
        console.log(error);
      }
    );
  }

  onEdite(id: number) {
    this.router.navigate(['/posts/edit/' + id]);
  }

  deleteComment(id: string){
    let newComments = this.post.comments?.filter((comment)=>{

      return comment.id!=id;

    });

    this.post.comments=newComments;
  
  
    this.postService.updateOne(this.post.id, this.post).subscribe();
    
  }

  addComment(comment:CommentModel){

    
      let newComments = this.post.comments;
      newComments?.push(comment);
      this.post.comments= newComments

      
      this.postService.updateOne(this.post.id,this.post)


  }
}
