import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { DashComponent } from './admin/dash/dash.component';
import { AuthGuardAdminService as AuthAdminGuard } from './auth/auth-guard-admin.service';
import { ForbiddenComponent } from './admin/forbidden/forbidden.component';
import { MessagesComponent } from './admin/messages/messages.component';

const routes: Routes = [
  { path:"", component: LoginComponent },
  { path:"login", component: LoginComponent },
  { path:"home", component: HomeComponent, canActivate: [AuthGuard] },
  { path:"products", component: ProductsComponent,canActivate: [AuthGuard] },
  { path:"products/:brand", component: ProductsComponent, canActivate: [AuthGuard] },
  { path:"products/:brand/:serial", component: ProductDetailComponent, canActivate: [AuthGuard] },
  { path:"register", component: RegisterComponent},
  { path:"cart", component: CartComponent, canActivate: [AuthGuard]},
  { path:"contact", component: ContactComponent, canActivate: [AuthGuard]},
  { path:"Thankyou", component: ThankyouComponent, canActivate: [AuthGuard]},
  // ADMIN //
  { path:"admin", component: DashComponent, canActivate: [AuthAdminGuard], children: [
    { path:"messages", component: MessagesComponent},
  ]},
  { path: 'Forbidden', component: ForbiddenComponent },
  // END //
  { path: 'PageNotFound', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/PageNotFound'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
