import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { authUser, isAuthenticated } from '../../core/auth.state';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    // RouterLinkActive,
    CommonModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public profile = authUser;
  public logged = isAuthenticated;
  public searchText: string = '';
  @Output() search = new EventEmitter<string>();
  constructor(
    private auth: AuthService,
    private activatedRoute: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.searchText = params['search'] || '';
    });
  }
  public logout(): void {
    this.auth.logout();
  }

  public submitSearch(): void {
    this.search.emit(this.searchText.trim());
  }
}
