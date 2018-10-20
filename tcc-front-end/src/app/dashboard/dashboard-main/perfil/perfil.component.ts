import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";

import { PerfilService } from './perfil-service.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit{

  id:any;
  id_logado:number;
  is_my_profile:boolean = false;
  usuario:any = {};
  depoimentos: any[] = [];
  grupos: any [] = [];
  amigos:any[] = [];
  pag_amigos:number = 0 ;
  num_amigos:number = 0;
  pag_depo:number = 0;
  num_depo:number = 0 ;
  pag_group:number = 0;
  num_group:number = 0;
  num_friends:number = 0 ;
  relacao:any;


  constructor(private router:Router,private perfilService:PerfilService, private http:HttpClient, private route:ActivatedRoute, private toastr:ToastrService) { 
    
  }

   ngOnInit() {
    this.id_logado = JSON.parse(localStorage.getItem('user')).node._id;
    this.pag_depo = 0 ;
    this.pag_group = 0;
    this.num_depo = 0 ;
    this.num_group = 0 ;
    this.num_amigos = 0;
    this.pag_amigos =0;
    this.relacao = {};
    this.route.params.subscribe( params => {
      this.id = Number(params.id);
      this.getUserInformation();
      if (this.id == this.id_logado) this.is_my_profile = true;
    });
   
  }

  getUserInformation(){

    this.grupos = [];
    this.depoimentos = [];
    this.amigos = [];
    this.pag_depo=0;
    this.pag_group = 0;
    this.pag_amigos =0;
     //Pega o usuário com id passado no parâmetro
     this.perfilService.getUserById(this.id).subscribe(res=>{
      this.usuario = res[0].node.properties;
    });
    
    //Pega os depoimentos do usuário com o id passado no parametro
    this.perfilService.getUserDepos(this.id, this.pag_depo).subscribe(res=>{
      for( let index = 0; index< res.length; index++ ){
        this.depoimentos.push(res[index]);
      }
    });

    //Pega todos os amigos de um usuário
    this.perfilService.getFriends(this.id, this.pag_amigos).subscribe(res=>{
      for( let index =0 ; index<res.length; index++){
        this.amigos.push(res[index]);
      }
    });

    //Pega os grupos de que um usuário faz parte
    this.perfilService.getUserGroups(this.id, this.pag_group).subscribe(res=>{
      for( let index = 0; index< res.length; index++ ){
        this.grupos.push(res[index]);
      }
    });

    //Pega o número total de depoimentos que um usuário tem 
    this.perfilService.getUserDeposNumbers(this.id).subscribe(res=>{
      this.num_depo = res[0].depos;
    });

    //Pega o número total de grupos que um usário tem 
    this.perfilService.getUserGroupsNumbers(this.id).subscribe(res=>{
      this.num_group = res[0].groups;
    });

    //Pega o número total de amigo que um usuário tem 
    this.perfilService.getUserFriendsNumbers(this.id).subscribe(res=>{
      this.num_friends = res[0].friends;
    });

    //Pega a relação entre o usuário logado e o usuário do perfil
    this.perfilService.getUserProfileRelation(this.id,this.id_logado).subscribe(res =>{
      if(res.length > 0){
        this.relacao = res[0].rel;
      } else {
        this.relacao.type = 'Nenhum';
      }
    })
  }
  // Função que cria uma relação ASK AS FRIEND entre dois nós
  askAsFriend(){
    this.perfilService.askAsFriend(this.id, this.id_logado).subscribe(res=>{
      if(res.length>0){
        this.relacao = res[0].rel;
        this.toastr.success("A solicitação foi enviada!", "Sucesso!");
      }else{
        this.toastr.error("Algo deu errado", "Ops");
      }
    });
  }

  // Função que deleta uma amizade
  deleteFriendship(){
    this.perfilService.deleteFriendship(this.id, this.id_logado).subscribe(res=>{
      if (res.length === 0 ){
        this.toastr.success("Amizade cancelada","Consguimos");
        this.relacao.type = "Nenhum";
      }else{
        this.toastr.error("Não conseguimos desfazer a amizade","Ops");
      }
    })
  }

  //Função que deleta uma solicitação de amizade
  deleteSolicitation(){
    this.perfilService.deleteSolicitation(this.id,this.id_logado).subscribe(res=>{
      if(res.length === 0){
        this.relacao.type = "Nenhum";
        this.toastr.success("A solicitação foi cancelada", "Deu certo");
      }else{
        this.toastr.error("Não conseguimos cancelar","Vish");
      }
    })
  }

  getMoreIndication(){
    this.pag_depo ++;
    this.perfilService.getUserDepos(this.id, this.pag_depo).subscribe(res=>{
      for( let index = 0; index< res.length; index++ ){
        this.depoimentos.push(res[index]);
      }
    });
  }

  getMoreGroups(){
    this.pag_group ++;
    this.perfilService.getUserGroups(this.id, this.pag_group).subscribe(res=>{
      for( let index = 0; index< res.length; index++ ){
        this.grupos.push(res[index]);
      }
    });
  }

  getMoreFriends(){
    this.pag_amigos ++;
    this.perfilService.getFriends(this.id, this.pag_amigos).subscribe(res=>{
      for( let index =0 ; index<res.length; index++){
        this.amigos.push(res[index]);
      }
    });
  }

  showMoreFriends(){
    if( this.num_amigos>5 && this.amigos.length< this.num_amigos) return true;
    else return false;
  }

  showMoreGroups(){
    if(this.num_group>5 && this.grupos.length<this.num_group) return true;
    else return false;
  }
  showMoreIndication(){
    if(this.num_depo>5 && this.depoimentos.length<this.num_depo) return true;
    else return false;
  }

  sendIndication(form:any){

    let depo ={
      "area":form.area,
      "depo":form.indicacao
    }

    this.perfilService.sendIndication(this.id_logado, this.id, depo).subscribe(res =>{
      if(res.length>0){
        this.toastr.success("Sua indicação foi enviada","Deu certo!");
      }else{
        this.toastr.error("Algo acaonteceu...","Deu ruim");
      }
    });
  }

  verGrupo(id:number){
    this.router.navigate(['/QuemIndica/grupo', id]);
  }

  verPerfil(id:number){
    this.router.navigate(['/QuemIndica/perfil',id])
  }


}
