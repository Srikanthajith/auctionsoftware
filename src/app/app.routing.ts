import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginuserComponent} from './components/loginuser/loginuser.component';
import {PaginationComponent} from './components/pagination/pagination.component';


const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginuserComponent},
    {path: 'pagination', component: PaginationComponent},
  ];


export const routing: ModuleWithProviders = RouterModule.forRoot(routes);