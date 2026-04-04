import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products: Product[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.fetchProducts(params);
    });
  }

  fetchProducts(query: Params) {
    this.loading = true;
    this.productService.searchProducts(query).subscribe({
      next: (res) => {
        this.products = res;
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

  navigateToProductDetail(productId: string) {
    this.router.navigate(['/products', productId]);
  }
}
