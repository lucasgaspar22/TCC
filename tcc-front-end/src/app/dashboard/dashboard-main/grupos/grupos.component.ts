import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

import { GruposService } from './grupos-service.service';
@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  id_logado:number;
  pagina:number = 0;
  num_grupos:number = 0;
  grupos:any[] =[];
  convites_pendentes:any[] = [];
  pagina_pendentes:number = 0;
  num_pendentes:number = 0;

  constructor(private gruposService:GruposService, private toastr: ToastrService, private router:Router) { }

  ngOnInit() {
    this.id_logado = Number(JSON.parse(localStorage.getItem('user')).node._id);
    this.pagina = 0 ;
    this.getNumbers();
    
    this.gruposService.getAllGroups(this.id_logado,this.pagina).subscribe((res)=>{
      for( let index = 0; index< res.length; index++ ){
        this.grupos.push(res[index]);
      }
    });

    this.gruposService.getRecievedInvitations(this.id_logado,this.pagina_pendentes).subscribe(res=>{
      for (let index=0 ;index<res.length; index++){
        this.convites_pendentes.push(res[index]);
      }
    });
  }

  getNumbers(){
    this.gruposService.getGroupNumber(this.id_logado).subscribe(res=>{
      if (res.length>0) this.num_grupos = res[0].groups;
    });

    this.gruposService.getRecievedNumber(this.id_logado).subscribe(res=>{
      if(res.length>0) this.num_pendentes = res[0].invites;
    });
  }

  createGroup(form:any){
    let grupo={
      "area":form.area,
      "nome":form.nome,
      "descricao":form.descricao
    };
    
    this.gruposService.createGroup(this.id_logado, grupo).subscribe(res=>{
      if(res.length>0){
        this.toastr.success("Seu grupo foi criado com sucesso!", "Deu certo",{
          timeOut:2000
        });
        this.grupos.push(res[0]);
      }
    })

  }

  acceptSolicitation(pendente:any){
    let grupo={
      group:{
        labels:['Group'],
        properties:{
          area:pendente.group.properties.area,
          descricao:pendente.group.properties.descricao,
          nome:pendente.group.properties.nome
        },
        _id:pendente.group._id
      },
      rel:{
        type:"INVITED",
        _fromId:pendente.inv._fromId,
        _toId:pendente.inv._toId,
        _id:pendente.inv._id,
        properties:{date:pendente.inv.properties.date}
      }
    }


    this.gruposService.acceptGroupInvitation(this.id_logado,pendente.group._id).subscribe(res=>{
      if(res.length>0){
        grupo.rel.properties.date = res[0].rel.properties.date
        grupo.rel._id = res[0].rel._id
        grupo.rel._fromId = res[0].rel._fromId
        grupo.rel._toId = res[0].rel._toId
        this.num_grupos++;
        let index = this.convites_pendentes.indexOf(pendente);
        if(index == 0 ) this.convites_pendentes.shift();
        else if (index === (this.convites_pendentes.length - 1 ))  this.convites_pendentes.pop();
        else this.convites_pendentes.splice(index,1);
        this.grupos.push(grupo);
        this.toastr.success("Convite aceito com sucesso!","Muito bom");
      }
      else{
        this.toastr.error("Não conseguimos aceitar", "Ops");
      }
    });
  }

  refuseSolicitation(pendente:any){
    this.gruposService.deleteGroupRelation(this.id_logado,pendente.group._id).subscribe(res=>{
      if (res.length === 0 ){
        this.toastr.success("Convite recusado","Consguimos");
        this.num_pendentes--;
        let index = this.convites_pendentes.indexOf(pendente);
        if(index == 0 ) this.convites_pendentes.shift();
        else if (index === (this.convites_pendentes.length - 1 ))  this.convites_pendentes.pop();
        else this.convites_pendentes.splice(index,1);
      }else{
        this.toastr.error("Não consegumos recusar o convite","Ops");
      }
    })
  }

  getMoreGroups(){
   this.pagina++;
   this.gruposService.getAllGroups(this.id_logado,this.pagina).subscribe(res=>{
     if(res.length>0){
      for( let index = 0; index< res.length; index++ ){
        this.grupos.push(res[index]);
      }
     }
   });
  }

  getMorePendente(){
    this.pagina_pendentes++;
    this.gruposService.getRecievedInvitations(this.id_logado,this.pagina_pendentes).subscribe(res=>{
      for (let index=0 ;index<res.length; index++){
        this.convites_pendentes.push(res[index]);
      }
    });
  }


  verGrupo(id:number){
    this.router.navigate(['/QuemIndica/grupo', id]);
  }

  showGetMoreGroups(){
    if(this.num_grupos> 5 && this.grupos.length < this.num_grupos) return true
    else return false;
  }

  showGetMorePendentes(){
    if(this.num_pendentes> 5 && this.convites_pendentes.length < this.num_pendentes) return true
    else return false;
  }

}
