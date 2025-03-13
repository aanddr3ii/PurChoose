import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { CategoryProductComponent } from './category-product/category-product.component';
import { PaginaPerfilComponent } from './pagina-perfil/pagina-perfil.component';
import { UserProductComponent } from './userProduct/user-product/user-product.component';
import { RegisterSellerComponent } from './register-seller/register-seller.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AdminComponent } from './admin/admin.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { InboxComponent } from './inbox/inbox.component';



export const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'perfil', component: PaginaPerfilComponent },
    { path: 'inbox', component: InboxComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'register-seller', component: RegisterSellerComponent },
    { path: 'login', component: LoginComponent },
    { path: 'editarP', component: EditarPerfilComponent },
    { path: 'category-product', component: CategoryProductComponent },
    { path: 'user-product', component: UserProductComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'admin', component: AdminComponent }, 
    { path: 'admin/manage-users', component: ManageUsersComponent }, // Gestionar usuarios
    { path: 'admin/manage-categories', component: ManageCategoriesComponent }, // Gestionar categorías
    { path: 'admin/manage-products', component: ManageProductsComponent }, // Gestionar productos



];
