import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  user:any = {};
  img_usuario:string = "../../assets/images/menu_user.png";  

  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')).node.properties;
    if( this.user.foto !== "") this.img_usuario = this.user.foto;
  }

}
