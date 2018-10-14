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
  pagina:number;
  grupos:any[] =[];

  constructor(private gruposService:GruposService, private toastr: ToastrService, private router:Router) { }

  ngOnInit() {
    this.id_logado = Number(JSON.parse(localStorage.getItem('user')).node._id);
    this.pagina = 0 ;
    this.gruposService.getAllGroups(this.id_logado,this.pagina).subscribe((res)=>{
      for( let index = 0; index< res.length; index++ ){
        this.grupos.push(res[index]);
      }
      console.log(res)
    })
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

  getMoreGroups(){
   this.pagina++;
   this.gruposService.getAllGroups(this.id_logado,this.pagina).subscribe(res=>{
     if(res.length>0){
      for( let index = 0; index< res.length; index++ ){
        this.grupos.push(res[index]);
      }
     }
   })
  }


  verGrupo(id:number){
    this.router.navigate(['/QuemIndica/grupo', id]);
  }

}
