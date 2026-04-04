import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './features/footer/footer.component';
import { HeaderComponent } from './features/header/header.component';
import { AuthService } from './core/auth.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    inject(AuthService).loadSession();
  }
  protected readonly title = signal('ecom-ui');

  onSearch(searchText: string) {
    this.router.navigate(['/products'], {
      queryParams: { search: searchText },
      queryParamsHandling: 'merge',
    });
  }
}
