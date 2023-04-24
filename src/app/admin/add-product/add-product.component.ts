import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryProductService } from 'src/app/services/category-product.service';
import { ProductService } from 'src/app/services/product.service';
import { CategoryProduct } from 'src/app/models/category-product';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: [
    './add-product.component.css',
    '../../../assets/admin/css/paper-dashboard.css',
    '../../../assets/admin/demo/demo.css',
    '../../../assets/admin/css/bootstrap.min.css',
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AddProductComponent implements OnInit {
  files: string[] = [];
  selectedFiles!: FileList;
  images: string[] = [];
  product: Product = new Product();
  categories!: CategoryProduct[];
  errorMessage: string = '';
  userFile: any;
  file!: string;
  public imagePath: any;
  imgURL: any;

  constructor(
    public productService: ProductService,
    private router: Router,
    private categoryProductService: CategoryProductService,
    public toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.categoryProductService.getProductCategories().subscribe((data) => {
      this.categories = data;
    });
    this.infoForm();
  }

  infoForm() {
    this.productService.dataForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      prix: [0, [Validators.required]],
      quantity: [0, [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  addProduct() {
    const formData = new FormData();

    const product = this.productService.dataForm.value;
    // formData.append('article', JSON.stringify(product));
    formData.append('product', JSON.stringify(product));

    for (let i = 0; i < this.files.length; i++) {
      formData.append('files', this.files[i]);
      console.log(formData);
    }

    // formData.append('file', this.userFile);
    formData.append('file', this.file);
    this.productService.addTask(formData).subscribe((data) => {
      this.router.navigate(['/']);
    });
  }

  setNewCategory(category: CategoryProduct): void {
    console.log(category);
    this.productService.dataForm.value.category = category;
  }

  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      for (var i = 0; i < event.target.files.length; i++) {
        this.files.push(event.target.files[i]);
      }

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.toastr.success('Only images are supported.');

        return;
      }
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
  }
  onSelectFirstFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
      // this.f['profile'].setValue(file);

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.toastr.success('Only images are supported.');

        return;
      }
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
  }
}

