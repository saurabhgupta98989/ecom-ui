import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private router: Router) {}
  categories = [
    {
      name: 'Men',
      image:
        'https://plus.unsplash.com/premium_photo-1688497831384-e40b2e5615cd?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Women',
      image:
        'https://plus.unsplash.com/premium_photo-1675186049366-64a655f8f537?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Kids',
      image:
        'https://images.unsplash.com/photo-1607453998774-d533f65dac99?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  public navigateToProductsByAudience(audience: string): void {
    this.router.navigate(['/products'], {
      queryParams: { audience: audience },
    });
  }
  public navigateToProductsByBrand(brand: string): void {
    this.router.navigate(['/products'], {
      queryParams: { brand: brand },
    });
  }
  public navigateToProductsByCategory(category: string): void {
    this.router.navigate(['/products'], {
      queryParams: { category: category },
    });
  }
  public navigateToProductsByColor(color: string): void {
    this.router.navigate(['/products'], {
      queryParams: { color: color },
    });
  }
  public navigateToProductsByTag(tag: string): void {
    this.router.navigate(['/products'], {
      queryParams: { tag: tag },
    });
  }
  public navigateToProductsByPrice(minPrice: number): void {
    this.router.navigate(['/products'], {
      queryParams: { minPrice: minPrice },
    });
  }
}
