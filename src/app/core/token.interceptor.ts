// import { HttpInterceptorFn } from '@angular/common/http';
// import { AuthService } from './auth.service';
// import { inject } from '@angular/core';

// export const tokenInterceptor: HttpInterceptorFn = async (req, next) => {
//   const auth = inject(AuthService);

//   try {
//     const token = await auth.getToken();

//     if (token) {
//       req = req.clone({
//         setHeaders: { Authorization: `Bearer ${token}` },
//       });
//     }
//   } catch {}

//   return next(req);
// };
