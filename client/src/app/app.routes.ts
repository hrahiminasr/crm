import { Routes } from '@angular/router';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { CustomersComponent } from './components/customers/customers.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductComponent } from './components/product/product.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'account/login', component: LoginComponent },
    { path: 'account/register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'customers', component: CustomersComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'customersList', component: CustomersListComponent },
    { path: 'product', component: ProductComponent },
    { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];
