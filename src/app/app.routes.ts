import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';

import { CategoryProductComponent } from './category-product/category-product.component';
import { PaginaPerfilComponent } from './pagina-perfil/pagina-perfil.component';



export const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'perfil', component: PaginaPerfilComponent }, // Ruta para el perfil
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'category-product', component: CategoryProductComponent },


];
