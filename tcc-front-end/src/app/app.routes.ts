import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { DashboardMainComponent } from './dashboard/dashboard-main/dashboard-main.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { BuscaComponent } from './dashboard/dashboard-main/busca/busca.component';
import { PerfilComponent } from './dashboard/dashboard-main/perfil/perfil.component';

export const ROUTES:Routes=[
    {path:"", component:LoginComponent},
    {path:"Cadastro", component:CadastroComponent},
    {path:"QuemIndica", component:DashboardComponent,
    children:[
        {path:'', component:DashboardMainComponent},
        {path:'busca', component:BuscaComponent },
        {path:'perfil/:id', component: PerfilComponent}
    ]}
]