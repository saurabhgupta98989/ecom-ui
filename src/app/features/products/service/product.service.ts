import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../../../core/models/product.model';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // private api = 'http://localhost:8082';
  private api = 'http://a08c912a55cb94342b59f239d846f662-310872535.ap-south-1.elb.amazonaws.com';

  constructor(private http: HttpClient) {}

  searchProducts(parms: Params): Observable<Product[]> {
    return this.http
      .get<{ content: Product[] }>(`${this.api}/api/products/search`, {
        params: parms,
      })
      .pipe(map((res) => res['content']));
  }
}
