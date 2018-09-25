import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ROUTES } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
//TOASTR
import { ToastrModule } from 'ngx-toastr';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// APP COMPONENTS
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardMainComponent } from './dashboard/dashboard-main/dashboard-main.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { BuscaComponent } from './dashboard/dashboard-main/busca/busca.component';
import { PerfilComponent } from './dashboard/dashboard-main/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    DashboardComponent,
    LoginComponent,
    DashboardMainComponent,
    CadastroComponent,
    BuscaComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
