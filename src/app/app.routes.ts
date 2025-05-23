import { Routes } from '@angular/router';

// Index
import { IndexComponent } from './IndexPurchoose/index/index.component';

// Nav-Belt
import { LoginComponent } from './authUser/login/login.component';
import { ForgotPasswordComponent } from './authUser/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authUser/reset-password/reset-password.component';
import { RegisterComponent } from './authUser/register/register.component';
import { RegisterSellerComponent } from './authUser/register-seller/register-seller.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { InboxComponent } from './Inboxx/inbox/inbox.component';
import { SellProductComponent } from './sell-product/sell-product.component';
import { SellProductEmpresaurioComponent } from './sell-product-empresaurio/sell-product-empresaurio.component';
import { CartComponent } from './cart/cart.component';
import { PaginaPerfilComponent } from './pagina-perfil/pagina-perfil.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { ChatDetailComponent } from './Inboxx/chat-detail/chat-detail.component';


// Shopping
import { MethodPaymentComponent } from './method-payment/method-payment.component';

// Shopping Progress
import { ShoppingInProgressComponent } from './shopping-products/shopping-in-progress/shopping-in-progress.component';
import { ShoppingFinalizedComponent } from './shopping-products/shopping-finalized/shopping-finalized.component';

// User Product Selling 
import { UserProductComponent } from './userProduct/user-product/user-product.component';

// Product Filters
import { CategoryProductComponent } from './category-product/category-product.component';

// Inbox
import { ProductsComponent } from './Inboxx/products/products.component';

// Admin
import { AdminComponent } from './admin/admin.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { HistorialComponent } from './historial/historial.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { VentasComponent } from './Inboxx/ventas/ventas.component';

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
    { path: 'sell-product-empresaurio', component: SellProductEmpresaurioComponent },
    { path: 'cart', component: CartComponent },
    { path: 'perfil', component: PaginaPerfilComponent },
        { path: 'editarP', component: EditarPerfilComponent },

    // Where you see the products you buy and sell "the progress"
    { path: 'shopping-InProgress', component: ShoppingInProgressComponent },
    { path: 'shopping-Finalized', component: ShoppingFinalizedComponent },
    { path: 'historial', component: HistorialComponent }, // Nueva ruta para el historial

    // Shopping
    { path: 'payment', component: MethodPaymentComponent },
    
    // Edit product
    { path: 'edit-product', component: EditProductComponent },
    // User product selling
    { path: 'user-product', component: UserProductComponent },

    // Where you see the product and the filters
    { path: 'category-product/:id', component: CategoryProductComponent },

    { path: 'productos/:id/detalles', component: UserProductComponent },

    //Inbox
    { path: 'products', component: ProductsComponent },
    { path: 'ventas', component: VentasComponent },

    /* Admin */
    { path: 'admin', component: AdminComponent }, // Menu
        { path: 'admin/manage-users', component: ManageUsersComponent }, // Manage users
        { path: 'admin/manage-categories', component: ManageCategoriesComponent }, // Manage categories
        { path: 'admin/manage-products', component: ManageProductsComponent }, // Manage products
    /*CHAT*/
    {  path: 'chat/:id',  component: ChatDetailComponent}
    
    //...

];
