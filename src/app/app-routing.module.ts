import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleProductComponent } from './front/shop/single-product/single-product.component';
import { HomeComponent } from './front/home/home.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { UpdateProductComponent } from './admin/update-product/update-product.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AddcategoryComponent } from './admin/addcategory/addcategory.component';
import { ListCategoryComponent } from './admin/list-category/list-category.component';
import { CategoryProduct } from './models/category-product';
import { ListProductComponent } from './admin/list-product/list-product.component';
import { ProductsComponent } from './front/shop/products/products.component';
import { AddPostComponent } from './front/add-post/add-post.component';
import { PostComponent } from './front/post/post.component';
import { HomepostComponent } from './front/homepost/homepost.component';
import { PostsEditComponent } from './front/add-post/posts/posts-edit/posts-edit.component';
import { PostsShowComponent } from './front/add-post/posts/posts-show/posts-show.component';


const routes: Routes = [
  {path: 'products/:id', component: SingleProductComponent},
   {path: '', component: HomeComponent},
   {path:'shop', component: ProductsComponent},
   {path: 'shopdet', component: SingleProductComponent},
   //{path: 'cart-details', component: CartDetailsComponent},
  
  // {path: 'checkout', component: CheckoutComponent},
   {path: 'add', component: AddProductComponent},
   { path: 'listProduct', component: ListProductComponent },
   { path: 'updateProduct/:id', component: UpdateProductComponent },
   {path: 'admin', component: DashboardComponent},
//{path: 'order-history', component: OrderHistoryComponent}, 
   {path: 'addCategory', component: AddcategoryComponent},
   {path: 'listCategory', component: ListCategoryComponent},

  //{path:'favoriteProduct', component: WishListComponent},
  { path: 'listProduct/:id', component: CategoryProduct },
  //add blog post
  { path: 'addblog', component: AddPostComponent },
  { path: 'showblog', component: HomepostComponent
 },
  { path: 'show', component: PostsShowComponent},
  { path: 'edit', component: PostsEditComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
