import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'
import { MenuService } from './menu.service';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit,OnDestroy {
  
  user:any = {};
  is_logged:boolean;
  id_logado:number = 0;
  img_usuario:string = "../../assets/images/menu_user.png";
  amigos_anterior:number=0;
  indicacoes_anterior:number=0;
  grupo_anterior:number=0;
 
  notificacao:any;

  constructor(private router:Router, private menuService:MenuService, private toastr:ToastrService) { }

  ngOnInit() {
    
    if (localStorage.length>0) {
      this.is_logged = true;
      this.user = JSON.parse(localStorage.getItem('user')).node.properties;
      this.id_logado = JSON.parse(localStorage.getItem('user')).node._id;
      
      this.notificacao = setInterval(()=>{ 
        this.menuService.getNewFriendsNumber(this.id_logado).subscribe(res=>{
          if(res.length>0){
            if(res[0].friends>0 && res[0].friends != this.amigos_anterior){
              this.amigos_anterior=res[0].friends;
              this.toastr.warning("Novos amigos esperando sua aprovação!","Notificação");
            }
          }
        });

        this.menuService.getNewGroupNumber(this.id_logado).subscribe(res=>{
          if(res.length>0){
            if(res[0].invites>0 && res[0].invites != this.grupo_anterior){
              this.grupo_anterior=res[0].invites;
              this.toastr.warning("Você foi convidado para novos grupos!","Notificação");
            }
          }
          
        });
       
        this.menuService.getNewIndicationNumber(this.id_logado).subscribe(res=>{
          if(res.length>0){
            if(res[0].depos>0 && res[0].depos != this.indicacoes_anterior){
              this.indicacoes_anterior=res[0].depos;
              this.toastr.warning("Você possui novas indicações!","Notificação");
            }
          }
        });

      },60000);

      if( this.user.foto !== "") this.img_usuario = this.user.foto;
    }
    else {
      this.is_logged=false;
    } 
  }

  ngOnDestroy(){
    if(this.is_logged){
      clearInterval(this.notificacao);
    }
  }

  perfil(){
    this.router.navigate(['/QuemIndica/perfil', this.id_logado]);
  }

}
