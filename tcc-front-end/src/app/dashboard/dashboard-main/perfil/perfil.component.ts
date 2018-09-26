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

export class PerfilComponent implements OnInit, AfterViewInit {

  id:any;
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
      console.log(this.grupos);
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


  }

  ngAfterViewInit(){
  }

  getUserId():number{
    var id;
    this.route.params.subscribe( params => {
      id = Number(params.id);
    });
    return id;
  }


}
