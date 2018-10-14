import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { GrupoDetalhesService } from './grupo-detalhes-service.service';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';

@Component({
  selector: 'app-grupo-detalhes',
  templateUrl: './grupo-detalhes.component.html',
  styleUrls: ['./grupo-detalhes.component.css']
})

export class GrupoDetalhesComponent implements OnInit {

  id_grupo:number;
  id_logado:number;
  relation:string = "Nenhum";
  group_details: any[]=[];
  pag_membros: number = 0;
  num_membros:number = 0 ;
  membros:any[]=[];
  selected_group:any={labels:["Group"],properties:{area:"",nome:"",descricao:""},_id:""};
  creator:any ={labels:["User"],properties:{email:"",nome:"",foto:"",local:"",profissao:"",token:""},_id:""};
  rel_group_creator:any={properties:{data:""},type:"CREATED",_fromId:"",_id:"",_toId:""};

  usuarios: any = [];
  encontrou_usuarios:boolean = false;

  constructor(private grupoDetalheService: GrupoDetalhesService, private route:ActivatedRoute, private toastr:ToastrService) {}

  ngOnInit() {
    this.id_grupo = this.getGroupId();
    this.pag_membros=0;
    this.id_logado = JSON.parse(localStorage.getItem('user')).node._id;

    this.getGroupDetail();
    this.getGroupMembers();
    this.getMembersNumber();
    this.getRelationUserGroup();
  }
 

  getGroupId():number{
    var id;
    this.route.params.subscribe( params => {
      id = Number(params.id);
    });
    return id;
  }

  verMais(){
    this.pag_membros++;
    this.getGroupMembers();
  }

  askMembership(){
    this.grupoDetalheService.askMembership(this.id_logado,this.id_grupo).subscribe(res=>{
      if(res.length>0) {
        this.relation="ASKED_MEMBERSHIP"
        this.toastr.success("Seu pedido foi enviado com sucesso", "Deu certo",{
          timeOut:2000
        })
      }
    })
  }

  deleteRelation(message:string,titulo:string){
    this.grupoDetalheService.deleteRelationBetweenGroupUser(this.id_logado,this.id_grupo).subscribe((res)=>{
      if(res.length === 0){
        let removed_user = this.membros.find(x => x.user._id == this.id_logado);
        let index = this.membros.indexOf(removed_user);
        this.membros.splice(index,1);
        this.num_membros--;
        this.relation= "Nenhuma";
        this.toastr.success(message, titulo);
      }else{
        this.toastr.error("Não conseguimos cancelar","Vish");
      }
    })
  }

  inviteMember(id_usuario:number){
    this.grupoDetalheService.inviteMember(id_usuario,this.id_grupo).subscribe(res=>{
      if(res.length>0){
        this.toastr.success("Conseguimos enviar esse convite","Sucesso");
      }else{
        this.toastr.error("Tente de novo depois","Vish")
      }
    })
  }

  acceptInvitation(){
    this.grupoDetalheService.acceptInvitation(this.id_logado,this.id_grupo).subscribe(res=>{
      if(res.length>0){
        this.num_membros++;
        this.relation="IS_MEMBER";
        let node = {
            user:JSON.parse(localStorage.getItem('user')).node
          }
        this.membros.push(node);
        this.toastr.success("Você é um membro agora!", "Convite aceito");
      }
    })
  }


  getRelationUserGroup(){
    this.grupoDetalheService.getRelationgGroupUser(this.id_logado,this.id_grupo).subscribe(res=>{
      if(res.length>0) this.relation= res[0].rel.type;
      else this.relation="Nenhuma"
    })
  }

  getMembersNumber() {
    this.grupoDetalheService.getMembersNumber(this.id_grupo).subscribe(res=>{
      if(res.length>0) this.num_membros = res[0].members;
    })
  }

  getGroupMembers(){
    this.grupoDetalheService.getGroupMembers(this.id_grupo,this.pag_membros).subscribe((res)=>{
      for(let index=0 ; index<res.length; index++){
        this.membros.push(res[index]);
      }
    });
  }

  getGroupDetail(){
    this.grupoDetalheService.getGroupDetails(this.id_grupo).subscribe(res=>{
      if(res.length>0){
        this.selected_group = {labels:["Group"],
          properties:{
            area:res[0].group.properties.area,
            nome:res[0].group.properties.nome,
            descricao:res[0].group.properties.descricao
          },
          _id:this.id_grupo
        };
        this.creator = {labels:["User"],
          properties:{
            email:res[0].user.properties.email,
            nome:res[0].user.properties.nome,
            foto:res[0].user.properties.foto,
            local:res[0].user.properties.local,
            profissao:res[0].user.properties.profissao,
            token:res[0].user.properties.token
          },
          _id: res[0].user._id
        };
        
        this.rel_group_creator={
          type:res[0].rel.type,
          properties:{data:res[0].rel.properties.data},
          _fromId:res[0].rel._fromId,
          _id:res[0].rel._id,
          _toId:res[0].rel.toId

        };res[0].rel;
      }
    })
  }



  search(form:any){
    let name_email = form.email_name;

    this.grupoDetalheService.search(name_email,this.id_logado).subscribe(res=>{
      if(res.length>0){
        this.usuarios = res;
        this.encontrou_usuarios = true;
      }else{
        this.toastr.error("Não encontramos ninguém...","Ops",{timeOut:5000});
        this.encontrou_usuarios = false;
      }
    })
  }

}
