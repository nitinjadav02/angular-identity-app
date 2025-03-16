import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';  // Import the AuthInterceptor

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // provideHttpClient(),  // Provide the HTTP client
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,  // Register the AuthInterceptor
    //   multi: true  // Allow multiple interceptors
    // },
    provideAnimationsAsync()
  ]
};