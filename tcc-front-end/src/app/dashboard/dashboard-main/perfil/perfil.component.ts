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
  pag_depo:number = 0;
  pag_group:number = 0;
  relacao:any;

  constructor(private perfilService:PerfilService, private http:HttpClient, private route:ActivatedRoute, private toastr:ToastrService) { }

   ngOnInit() {
    this.pag_depo = 0 ;
    this.pag_group = 0;
    this.relacao = {};
    this.id = this.getUserId();
    this.perfilService.getUserById(this.id).subscribe(res=>{
      this.usuario = res[0].node.properties;
      console.log(this.usuario)
    });

  }

  ngAfterViewInit(){
    // Pega o Perfil do usuário
    
    //Pega os Depoimentos do usuário
  
    //Pega os Grupos do usuário

    //Pega a relação entre o usuário logado e o usuário buscado
  }

  getUserId():number{
    var id;
    this.route.params.subscribe( params => {
      id = Number(params.id);
    });
    return id;
  }


}
