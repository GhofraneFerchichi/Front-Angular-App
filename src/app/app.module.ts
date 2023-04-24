import { ListProductComponent } from './admin/list-product/list-product.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './front/home/home.component';
import { SingleProductComponent } from './front/shop/single-product/single-product.component';
import { CategoryProductComponent } from './front/shop/category-product/category-product.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { AddcategoryComponent } from './admin/addcategory/addcategory.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ListCategoryComponent } from './admin/list-category/list-category.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { UpdateProductComponent } from './admin/update-product/update-product.component';
import { NavbarComponent } from './front/navbar/navbar.component';
import { FooterComponent } from './front/footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProductService } from './services/product.service';
import { WishListService } from './services/wish-list.service';
import { PostsShowComponent } from './front/add-post/posts/posts-show/posts-show.component';
import { NavComponent } from './admin/nav/nav.component';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './front/shop/products/products.component';
import { AddPostComponent } from './front/add-post/add-post.component';
import { from } from 'rxjs';
import { PostComponent } from './front/post/post.component';
import { PostsEditComponent } from './front/add-post/posts/posts-edit/posts-edit.component';
import {EditorModule} from '@tinymce/tinymce-angular';
import { HomepostComponent } from './front/homepost/homepost.component';
import { DatePipe } from '@angular/common';
import { PostsComponent } from './front/add-post/posts/posts.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListProductComponent,
    SingleProductComponent,
    CategoryProductComponent,
    AddProductComponent,
    AddcategoryComponent,
    DashboardComponent,
    ListCategoryComponent,
    NavbarComponent,
    SidebarComponent,
    UpdateProductComponent,
    FooterComponent,
    NavComponent,
    ProductsComponent,
    AddPostComponent,
    PostComponent,
    PostsEditComponent,
    AddPostComponent,
    PostsComponent,
    HomepostComponent,
    PostsShowComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      {path : '', component:HomepostComponent},
      
      {path : 'post/:id', component:PostsShowComponent},
      {path:'home' ,component:HomeComponent},
      {path:'add-post' ,component:AddPostComponent},
      {path: 'posts/edit/:id', component: PostsEditComponent}, 
      {path: 'posts/show/:id', component: PostsShowComponent},

    ]),
    EditorModule,
    CommonModule,
    FormsModule 
    
    
  ],
  providers: [ProductService,WishListService,EditorModule,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
