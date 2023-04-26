import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { PostModel } from 'src/app/models/post.model';

@Component({
  selector: 'app-posts-edit',
  templateUrl: './posts-edit.component.html',

  styleUrls: ['./posts-edit.component.css',

  '../../../../../assets/admin/css/paper-dashboard.css',
  '../../../../../assets/admin/demo/demo.css',
  '../../../../../assets/admin/css/bootstrap.min.css',]
})


export class PostsEditComponent implements OnInit, AfterViewInit {
  post!: PostModel;
  id!: number;
  EditForm: FormGroup;


  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.EditForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'content': new FormControl(null, [Validators.required])
    });
  }
  
  
 
   
  ngOnInit() {
  this.post = new PostModel();
  this.id = this.route.snapshot.params['id'];

    //const id = this.activatedRoute.snapshot.params['id'];
    this.postService.getOne(this.id).subscribe(data => {
      console.log(data)
      this.post = data;
    }, error => console.log(error));
}
updateOnePost() {
  const updatedPostData = {
    title: this.EditForm.value.title,
    body: this.EditForm.value.body
  };
  this.postService.updateOne(this.id, this.post)
    .subscribe(data => {
      console.log(data);
      this.post = new PostModel();
      
      this.gotoList();
    }, error => console.log(error));
}

onSubmit() {
  this.updateOnePost();    
}

gotoList() {
  this.router.navigate(['/']);
}
  updateForm() {
    this.EditForm.setValue({
      title: this.post.title,
      content: this.post.content
    });
  }  
  updatePost() {
    const postId = this.post.id;
    const updatedPostData = {
      title: this.EditForm.value.title,
      body: this.EditForm.value.body
    };
    this.postService.updatePost(this.post).subscribe(
      (updatedPost: PostModel) => {
        this.post = updatedPost;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
    
  

  ngAfterViewInit(): void { }

 
  loadForm() {
    this.EditForm = this.fb.group({
      'title': [this.post.title, Validators.required],
      'content': [this.post.content, Validators.required]
    });
  }
  
  onFormSubmit() {
    const title = this.EditForm.get('title')?.value;
    const content = this.EditForm.get('content')?.value;

    this.post.title = title;
    this.post.content = content;

    this.postService.updatePost(this.post).subscribe(
      (post: PostModel) => {
        this.router.navigate(['/showblog']);
      }, (error) => {
        console.log(error);
      }
    );
  }

}



