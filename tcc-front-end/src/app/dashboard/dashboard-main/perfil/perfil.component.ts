import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";

import { PerfilService } from './perfil-service.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit{

  id:any;
  id_logado:number;
  usuario:any = {};
  depoimentos: any[] = [];
  grupos: any [] = [];
  pag_depo:number = 0;
  num_depo:number = 0 ;
  pag_group:number = 0;
  num_group:number = 0;
  num_friends:number = 0 ;
  relacao:any;


  constructor(private perfilService:PerfilService, private http:HttpClient, private route:ActivatedRoute, private toastr:ToastrService) { }

   ngOnInit() {
    this.id_logado = JSON.parse(localStorage.getItem('user')).node._id;
    this.pag_depo = 0 ;
    this.pag_group = 0;
    this.num_depo = 0 ;
    this.num_group = 0 ;
    this.relacao = {};
    this.id = this.getUserId();

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

  // Função que pega o ID que está na URL
  getUserId():number{
    var id;
    this.route.params.subscribe( params => {
      id = Number(params.id);
    });
    return id;
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


}
