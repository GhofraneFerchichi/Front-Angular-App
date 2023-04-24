import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryProductService } from 'src/app/services/category-product.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { CategoryProduct } from 'src/app/models/category-product';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css',
  '../../../assets/admin/css/paper-dashboard.css',
  '../../../assets/admin/demo/demo.css',
  '../../../assets/admin/css/bootstrap.min.css',
],
encapsulation: ViewEncapsulation.None,
})
export class UpdateProductComponent implements OnInit {

  id!: number;
  selectedFiles!: FileList;
  product: Product = new Product();
  categories!: CategoryProduct[];
  errorMessage: string = '';
  userFile: any;
  public imagePath: any;
  imgURL: any;

  constructor(
    public productService: ProductService ,
    private router: Router,
    private categoryProductService: CategoryProductService,
    public toastr: ToastrService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productService.getProductById(this.id).subscribe((data) => {
      this.product = data;
    });
    this.categoryProductService.getProductCategories().subscribe((data) => {
      this.categories = data;
    });
    this.infoForm();
    console.log(this.product);
  }

  infoForm() {
    this.productService.dataForm = this.fb.group({
      name: [this.product.name, [Validators.required]],
      description: [this.product.description, [Validators.required]],
      nprix: [this.product.prix, [Validators.required]],
      quantity: [this.product.quantity, [Validators.required]],
      category: [this.product.category, [Validators.required]],
    });
  }

  addProduct() {
    const formData = new FormData();

    const product = this.productService.dataForm.value;
    // formData.append('article', JSON.stringify(product));
    formData.append('product', JSON.stringify(product));
    formData.append('file', this.userFile);
    console.log(formData);
    this.productService.addTask(formData).subscribe(
      (data) => {
        this.router.navigate(['/']);
      },
      (err) => {
        if (err?.status === 409) {
          this.errorMessage = 'Username alrady exist';
        } else {
          this.errorMessage = 'Unxpected error. Erro is: ' + err?.errorMessage;
          console.log(err);
        }
      }
    );
  }

  setNewCategory(category: CategoryProduct): void {
    console.log(category);
    this.productService.dataForm.value.category = category;
  }

  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
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

