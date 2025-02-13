import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { PaginaPerfilComponent } from './pagina-perfil/pagina-perfil.component';
import { CardProductComponent } from './card-product/card-product.component';

export const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'perfil', component: PaginaPerfilComponent }, // Ruta para el perfil
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },

    { path: 'card-product', component: CardProductComponent },


];
