import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';

import { CategoryProductComponent } from './category-product/category-product.component';

export const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'category-product', component: CategoryProductComponent },


];
