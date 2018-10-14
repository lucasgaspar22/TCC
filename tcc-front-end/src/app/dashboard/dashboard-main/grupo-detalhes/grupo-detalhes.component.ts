import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { GrupoDetalhesService } from './grupo-detalhes-service.service';

@Component({
  selector: 'app-grupo-detalhes',
  templateUrl: './grupo-detalhes.component.html',
  styleUrls: ['./grupo-detalhes.component.css']
})

export class GrupoDetalhesComponent implements OnInit {

  id_grupo:number;
  id_logado:number;
  group_details: any[]=[];
  constructor(private grupoDetalheService: GrupoDetalhesService, private route:ActivatedRoute, private toastr:ToastrService) {}

  ngOnInit() {
    this.id_grupo = this.getGroupId();
    this.id_logado = JSON.parse(localStorage.getItem('user')).node._id;
    
    this.grupoDetalheService.getGroupDetails(this.id_logado).subscribe((res)=>{
      console.log(res);
    })
  }

  getGroupId():number{
    var id;
    this.route.params.subscribe( params => {
      id = Number(params.id);
    });
    return id;
  }

}
