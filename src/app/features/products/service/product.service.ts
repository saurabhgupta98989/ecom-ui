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
  private api = 'http://a2acac119c12a4affb74476dc45f8eeb-1507855302.ap-south-1.elb.amazonaws.com';

  constructor(private http: HttpClient) {}

  searchProducts(parms: Params): Observable<Product[]> {
    return this.http
      .get<{ content: Product[] }>(`${this.api}/api/products/search`, {
        params: parms,
      })
      .pipe(map((res) => res['content']));
  }
}
