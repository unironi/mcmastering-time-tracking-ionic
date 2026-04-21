import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  // {
  //   path: 'home',
  //   loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  // },
  {
    path: '',
    // redirectTo: 'home',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'entries-list',
    loadComponent: () => import('./pages/entries-list/entries-list.page').then( m => m.EntriesListPage),
    canMatch: [authGuard]
  },
  {
    path: 'admin-view',
    loadComponent: () => import('./pages/admin-view/admin-view.page').then( m => m.AdminViewPage),
    canMatch: [authGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
