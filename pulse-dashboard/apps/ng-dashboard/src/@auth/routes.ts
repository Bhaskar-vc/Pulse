import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViaTokenComponent } from './components/login-via-token/login-via-token.component';
import { LoginViaCredentialsComponent } from './components/login-via-credentials/login-via-credentials.component';

const routes: Routes = [
  {
    path: 'login-via-token/:token',
    component: LoginViaTokenComponent,
  },
  {
    path: 'login-via-credential',
    component: LoginViaCredentialsComponent,
  },
];

@NgModule({
  declarations: [LoginViaTokenComponent, LoginViaCredentialsComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
