import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './app/auth/auth.interceptor';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

// bootstrapApplication(AppComponent, appConfig) // Use appConfig directly!
//   .catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
     provideRouter(routes),
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    ),
  ],
});