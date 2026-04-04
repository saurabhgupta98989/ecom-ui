import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Params } from '@angular/router';
import { Product, ProductDetail, ProductImage } from '../../core/models/product.model';
import { ProductService } from '../products/service/product.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  product: ProductDetail = {} as ProductDetail;
  loading = false;
  selectedImage?: ProductImage;
  selectedSize?: string;

  selectImage(img: ProductImage) {
    this.selectedImage = img;
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.fetchProductDetail(params['productId']);
    });
  }

  fetchProductDetail(productId: string) {
    this.loading = true;
    this.productService.productDetail(productId).subscribe({
      next: (res) => {
        this.product = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
      complete: () => {
        this.cdr.detectChanges();
      },
    });
  }
}
