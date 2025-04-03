import { Routes } from '@angular/router';

// Index
import { IndexComponent } from './index/index.component';

// Nav-Belt
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterComponent } from './register/register.component';
import { RegisterSellerComponent } from './register-seller/register-seller.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { InboxComponent } from './Inboxx/inbox/inbox.component';
import { SellProductComponent } from './sell-product/sell-product.component';
import { CartComponent } from './cart/cart.component';
import { PaginaPerfilComponent } from './pagina-perfil/pagina-perfil.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';

// Shopping Progress
import { ShoppingInProgressComponent } from './shopping-products/shopping-in-progress/shopping-in-progress.component';
import { ShoppingFinalizedComponent } from './shopping-products/shopping-finalized/shopping-finalized.component';

// User Product Selling 
import { UserProductComponent } from './userProduct/user-product/user-product.component';

// Product Filters
import { CategoryProductComponent } from './category-product/category-product.component';

// Admin
import { AdminComponent } from './admin/admin.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';

export const routes: Routes = [
    // Index
    { path: '', component: IndexComponent },

    // Nav-Belt 
    { path: 'login', component: LoginComponent },
        { path: 'forgot-password', component: ForgotPasswordComponent },
        { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'register', component: RegisterComponent },
        { path: 'register-seller', component: RegisterSellerComponent },
        { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
    { path: 'inbox', component: InboxComponent },
    { path: 'sell-product', component: SellProductComponent },
    { path: 'cart', component: CartComponent },
    { path: 'perfil', component: PaginaPerfilComponent },
        { path: 'editarP', component: EditarPerfilComponent },

    // Where you see the products you buy and sell "the progress"
    { path: 'shopping-InProgress', component: ShoppingInProgressComponent },
    { path: 'shopping-Finalized', component: ShoppingFinalizedComponent },
    
    
    // User product selling
    { path: 'user-product', component: UserProductComponent },

    // Where you see the product and the filters
    { path: 'category-product', component: CategoryProductComponent },


    /* Admin */
    { path: 'admin', component: AdminComponent }, // Menu
        { path: 'admin/manage-users', component: ManageUsersComponent }, // Manage users
        { path: 'admin/manage-categories', component: ManageCategoriesComponent }, // Manage categories
        { path: 'admin/manage-products', component: ManageProductsComponent }, // Manage products
    
    //...

];
