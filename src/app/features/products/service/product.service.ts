import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product, ProductDetail } from '../../../core/models/product.model';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private product_search_service = 'http://localhost:8082';
  private product_service = 'http://localhost:8081';
  // private product_search_service =
  //   'http://a08c912a55cb94342b59f239d846f662-310872535.ap-south-1.elb.amazonaws.com';
  // private product_service =
  //   'http://a08c912a55cb94342b59f239d846f662-310872535.ap-south-1.elb.amazonaws.com';

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
