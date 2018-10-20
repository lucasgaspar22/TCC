import { Component, OnInit } from '@angular/core';
import { IndicacoesService } from './indicacoes.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { ElementFinder } from 'protractor';
@Component({
  selector: 'app-indicacoes',
  templateUrl: './indicacoes.component.html',
  styleUrls: ['./indicacoes.component.css']
})
export class IndicacoesComponent implements OnInit {

  id_logado:number;

  indicacoes:any[]=[];
  indicacoes_num:number = 0 ;
  indicacoes_pag:number = 0 ;

  recebidos:any[]=[];
  recebidos_num:number = 0 ;
  recebidos_pag:number = 0;

  enviados:any[]=[];
  enviados_num:number = 0;
  enviados_pag:number = 0;

  constructor(private indicacoesService:IndicacoesService, private toastr:ToastrService, private router:Router) { }

  ngOnInit() {
    this.id_logado = JSON.parse(localStorage.getItem('user')).node._id;
    this.getAllNumbers();

    this.indicacoesService.getAllIndications(this.id_logado,this.indicacoes_pag).subscribe(res=>{
      for(let index = 0; index<res.length; index++){
        this.indicacoes.push(res[index]);
      }
    });

    this.indicacoesService.getAllWaitingConfirmationIndications(this.id_logado,this.recebidos_pag).subscribe(res=>{
      for(let index = 0; index<res.length; index++){
        this.recebidos.push(res[index]);
      }
    });

    this.indicacoesService.getAllSentWaitingConfirmation(this.id_logado,this.enviados_num).subscribe(res =>{
      for(let index = 0 ; index<res.length; index++){
        this.enviados.push(res[index]);
      }
    });
  }



  getMoreIndications(){
    this.indicacoes_pag++;
    this.indicacoesService.getAllIndications(this.id_logado,this.indicacoes_pag).subscribe(res=>{
      for(let index = 0; index<res.length; index++){
        this.indicacoes.push(res[index]);
      }
    });
  }

  getMoreRecievedIndications(){
    this.recebidos_pag ++;
    this.indicacoesService.getAllWaitingConfirmationIndications(this.id_logado,this.recebidos_pag).subscribe(res=>{
      for(let index = 0; index<res.length; index++){
        this.recebidos.push(res[index]);
      }
    });
  }

  getMoreSentIndications(){
    this.enviados_pag++;
    this.indicacoesService.getAllSentWaitingConfirmation(this.id_logado,this.enviados_num).subscribe(res =>{
      for(let index = 0 ; index<res.length; index++){
        this.enviados.push(res[index]);
      }
    });
  }

  acceptIndication(indication:any){
    this.indicacoesService.acceptIndication(this.id_logado, indication.depo._id).subscribe(res=>{
      if(res.length>0){
        this.toastr.success("Indiação aceita","Consguimos");
        this.recebidos_num--;
        this.indicacoes_num++;
        let index = this.recebidos.indexOf(indication);
        if(index == 0 ) this.recebidos.shift();
        else if (index === (this.recebidos.length - 1 ))  this.recebidos.pop();
        else this.recebidos.splice(index,1);
        this.indicacoes.push(indication);
      }else{
        this.toastr.error("Não aceitar a indicação","Ops");
      }
    })
  }

  refuseIndication(indication:any){
    
    this.indicacoesService.refuseIndicationRecieved(this.id_logado,indication.depo._id).subscribe(res=>{
      if (res.length === 0 ){
        this.toastr.success("Indiação recusada","Consguimos");
        this.recebidos_num--;
        let index = this.recebidos.indexOf(indication);
        if(index == 0 ) this.recebidos.shift();
        else if (index === (this.recebidos.length - 1 ))  this.recebidos.pop();
        else this.recebidos.splice(index,1);
      }else{
        this.toastr.error("Não recusar a indicação","Ops");
      }
    });
  };

  cancelIndicationSent(indication:any){
    this.indicacoesService.cancelIndicationSent(this.id_logado,indication.depo._id).subscribe(res=>{
      if (res.length === 0 ){
        this.toastr.success("Indiação cancelada","Consguimos");
        this.enviados_num--;
        let index = this.enviados.indexOf(indication);
        if(index == 0 ) this.enviados.shift();
        else if (index === (this.enviados.length - 1 ))  this.enviados.pop();
        else this.enviados.splice(index,1);
      }else{
        this.toastr.error("Não cancelar a indicação","Ops");
      }
    });
  }

  getAllNumbers(){
    this.indicacoesService.getIndicationsNumber(this.id_logado).subscribe(res=>{
      if(res.length>0) this.indicacoes_num = res[0].depos;
    });

    this.indicacoesService.getIndicationsRecievedNumber(this.id_logado).subscribe(res=>{
      if(res.length>0) this.recebidos_num = res[0].recieved;
    });

    this.indicacoesService.getIndicaionsSentNumber(this.id_logado).subscribe(res=>{
      if(res.length>0) this.enviados_num = res[0].sent;
    });
  }

  verPerfil(id:number){
    this.router.navigate(['/QuemIndica/perfil', id]);
  }

  showMoreIndications(){
    if(this.indicacoes_num>5 && this.indicacoes.length<this.indicacoes_num) return true;
    else return false;
  }

  showMoreRecieved(){
    if (this.recebidos_num>5 && this.recebidos.length< this.recebidos_num) return true;
    else return false;
  }

  showMoreSent(){
    if(this.enviados_num>5 && this.enviados.length<this.enviados_num) return true;
    else return false;
  }

}
