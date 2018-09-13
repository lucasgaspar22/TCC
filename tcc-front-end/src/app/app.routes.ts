import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { componentFactoryName } from '@angular/compiler';
import { DashboardMainComponent } from './dashboard/dashboard-main/dashboard-main.component';
import { CadastroComponent } from './cadastro/cadastro.component';

export const ROUTES:Routes=[
    {path:"", component:LoginComponent},
    {path:"Cadastro", component:CadastroComponent},
    {path:"ConnnectU", component:DashboardComponent,
    children:[
        {path:'', component:DashboardMainComponent}
    ]}
]