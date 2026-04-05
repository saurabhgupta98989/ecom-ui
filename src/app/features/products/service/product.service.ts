import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product, ProductDetail } from '../../../core/models/product.model';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // private product_search_service = 'http://localhost:8082';
  // private product_service = 'http://localhost:8081';
  private product_search_service =
    'http://k8s-ecom-ecomappi-6704779a40-685324248.ap-south-1.elb.amazonaws.com/product-service';
  private product_service =
    'http://k8s-ecom-ecomappi-6704779a40-685324248.ap-south-1.elb.amazonaws.com/search-service';

  constructor(private http: HttpClient) {}

  searchProducts(parms: Params): Observable<Product[]> {
    return this.http
      .get<{ content: Product[] }>(`${this.product_search_service}/api/products/search`, {
        params: parms,
      })
      .pipe(map((res) => res['content']));
  }

  productDetail(productId: string): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(`${this.product_service}/api/products/${productId}`);
  }
}
