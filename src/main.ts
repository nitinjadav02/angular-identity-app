import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './app/auth/auth.interceptor';  // Import the interceptor

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
