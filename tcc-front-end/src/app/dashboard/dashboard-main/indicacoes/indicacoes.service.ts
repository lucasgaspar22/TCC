import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class IndicacoesService {

  constructor(private http:HttpClient) { }

  getAllIndications(id:number,pag:number){
    let url = `http://localhost:3003/API/depoimento/has_depo/${id}/${pag}`;

    return this.http.get<any[]>(url);
  }

  getAllWaitingConfirmationIndications(id:number,pag:number){
    let url = `http://localhost:3003/API/depoimento/waiting_confirmation/${id}/${pag}`;
    
    return this.http.get<any[]>(url);
  }

  getAllSentWaitingConfirmation(id:number,pag:number){
    let url = `http://localhost:3003/API/depoimento/wrote/${id}/${pag}`;

    return this.http.get<any[]>(url);
  }

  acceptIndication(id_user:number,id_indication:number){
    let url = `http://localhost:3003/API/depoimento/${id_user}/${id_indication}`;

    return this.http.put<any[]>(url,{});
  }

  refuseIndicationRecieved(id_user:number,id_indication:number){
    let url = `http://localhost:3003/API/depoimento/waiting_confirmation/${id_user}/${id_indication}`;
    return this.http.delete<any[]>(url);
  }

  cancelIndicationSent(id_user:number,id_indication){
    let url = `http://localhost:3003/API/depoimento/wrote/${id_user}/${id_indication}`;

    return this.http.delete<any[]>(url);
  }

  getIndicationsNumber(id:number){
    let url = `http://localhost:3003/API/user/get_depo_number/${id}`;
    
    return this.http.get<any[]>(url);
  }

  getIndicaionsSentNumber(id:number){
    let url = `http://localhost:3003/API/user/get_written_waiting_depo/${id}`;
    
    return this.http.get<any[]>(url);
  }

  getIndicationsRecievedNumber(id:number){ 
    let url = `http://localhost:3003/API/user/get_recieved_waiting_depo/${id}`;

    return this.http.get<any[]>(url);
  }

}
