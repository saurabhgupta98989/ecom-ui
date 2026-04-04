import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth-pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./features/auth-pages/signup/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'verify',
    loadComponent: () =>
      import('./features/auth-pages/verify-otp/verify-otp.component').then((m) => m.VerifyOtpComponent),
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/products.component').then((m) => m.ProductsComponent),
  },
];
