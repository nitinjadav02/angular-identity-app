import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: LoginComponent }, // Default route
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }, // Route for RegisterComponent
    { path: 'dashboard', component: DashboardComponent }, // Route for DashboardComponent
    { path: '**', component: LoginComponent }, // Catch-all route redirects to login   
];
