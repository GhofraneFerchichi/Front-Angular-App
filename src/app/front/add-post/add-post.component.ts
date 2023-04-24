import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PostPayload } from './post-payload';
import { AddPostService } from '../../services/add-post.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  addPostForm!: FormGroup;
  title = new FormControl('');
  body = new FormControl('');
  image!: File; 
  posts: PostPayload[] = [];

  postPayload: PostPayload = {
    id: 0,
    title: '',
    content: '',
    imageUrl: '',
    userName: '',
    image: ''
  };

  constructor(private addPostService: AddPostService, private router: Router) { }

  ngOnInit() {
    this.addPostForm = new FormGroup({
      title: this.title,
      body: this.body
    });
  }
 
  
  addPost() {
    this.postPayload.title = this.addPostForm.get('title')!.value;
    this.postPayload.content = this.addPostForm.get('body')!.value;
    this.addPostService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    }, error => {
      console.log('Failed to get posts: ' + error);
    });
    
    
    // Upload image file if available
    if (this.image != null) {
      const fd = new FormData();
      const file = fd.get('file') as File;
this.addPostService.uploadImage(file).subscribe((data: any) => {
        this.postPayload['imageUrl'] = data.url;
        this.savePost();
      }, error => {
        console.log('Failed to upload image: ' + error);
      });
    } else {
      this.savePost();
    }
  }

  savePost() {
    this.addPostService.addPost(this.postPayload).subscribe((data: any) => {
      this.router.navigateByUrl('/');
    }, error => {
      console.log('Failed add post: ' + error);
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.image = file;
    }
  }
  
}
