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
import { pathToFileURL } from 'url';

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
  { path: 'PageNotFound', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/PageNotFound'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
