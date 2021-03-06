import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { AddProductsComponent } from './admin/add-products/add-products.component';
import { MessagesComponent } from './admin/messages/messages.component';
import { DashComponent } from './admin/dash/dash.component';
import { AuthGuardAdminService as AuthAdminGuard } from './auth/auth-guard-admin.service';
import { ForbiddenComponent } from './admin/forbidden/forbidden.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    CartComponent,
    ContactComponent,
    ProductsComponent,
    ProductDetailComponent,
    PageNotFoundComponent,
    ThankyouComponent,
    AddProductsComponent,
    MessagesComponent,
    DashComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard, AuthAdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
