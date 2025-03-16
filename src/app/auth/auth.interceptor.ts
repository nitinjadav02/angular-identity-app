// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
// import { AuthService } from './auth.service';
// import { Observable, switchMap } from 'rxjs';

import { HttpInterceptorFn } from "@angular/common/http";

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   //constructor(private authService: AuthService) {}

//   // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
//   //   console.log('AuthInterceptor: intercept called'); // Debugging statement
//   //   return this.authService.getToken().pipe( // Use the Observable!
//   //     switchMap(token => {
//   //       if (token) {
//   //         request = request.clone({
//   //           setHeaders: {
//   //             Authorization: `Bearer ${token}`
//   //           }
//   //         });
//   //       }
//   //       return next.handle(request);
//   //     })
//   //   );
//   // }

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
//     console.log('AuthInterceptor: intercept called'); // Debugging statement
//     return next.handle(request);
//   }
// }


export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token || ''}`,
    },
  });
  return next(clonedRequest);
};