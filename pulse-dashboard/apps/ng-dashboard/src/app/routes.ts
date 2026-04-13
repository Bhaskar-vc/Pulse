import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./portal/portal.module').then((m) => m.PortalModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('@auth/routes').then((m) => m.AuthRoutingModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
