import { Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard'

const redirectUnauthorizedUserToLogin = () => redirectUnauthorizedTo(['']); 
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

export const routes: Routes = [
    {
      path: '',
      loadComponent: () => import('./login/login.page').then( m => m.LoginPage),
      ...canActivate(redirectLoggedInToHome)
    },
    {
      path: 'home',
      loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      ...canActivate(redirectUnauthorizedUserToLogin)
    },
    {
      path: '**',
      redirectTo: 'login',
      pathMatch: 'full',
    },

];
