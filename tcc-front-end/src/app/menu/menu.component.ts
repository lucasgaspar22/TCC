import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  user:any = {};
  id_logado:number = 0;
  img_usuario:string = "../../assets/images/menu_user.png";  

  constructor(private router:Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')).node.properties;
    this.id_logado = JSON.parse(localStorage.getItem('user')).node._id;
    if( this.user.foto !== "") this.img_usuario = this.user.foto;
  }

  perfil(){
    this.router.navigate(['/QuemIndica/perfil', this.id_logado]);
  }

}
