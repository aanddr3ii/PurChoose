import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { CategoryProductComponent } from './category-product/category-product.component';
import { PaginaPerfilComponent } from './pagina-perfil/pagina-perfil.component';
import { UserProductComponent } from './userProduct/user-product/user-product.component';
import { RegisterSellerComponent } from './register-seller/register-seller.component';



export const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'perfil', component: PaginaPerfilComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'register-seller', component: RegisterSellerComponent },
    { path: 'login', component: LoginComponent },
    { path: 'editarP', component: EditarPerfilComponent },
    { path: 'category-product', component: CategoryProductComponent },
    { path: 'user-product', component: UserProductComponent },


];
