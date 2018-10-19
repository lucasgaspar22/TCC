import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VirtualTimeScheduler } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  constructor(private http:HttpClient) { }

  getGroupNumber(id:number){
    let url = `http://localhost:3003/API/user/get_group_number/${id}`;
    return this.http.get<any[]>(url);
  }

  getRecievedNumber(id:number){
    let url = `http://localhost:3003/API/user/get_group_invitations/${id}`;
    return this.http.get<any[]>(url);
  }

  getSentNumber(id:number){
    let url = `http://localhost:3003/API/user/get_asked_group_number/${id}`;
    return this.http.get<any[]>(url);
  }

  getAllGroups(id:number,pag:number){
    let url = `http://localhost:3003/API/groups/${id}/${pag}`;
    return this.http.get<any[]>(url);
  }

  getRecievedInvitations(id:number,pag:number){
    let url = `http://localhost:3003/API/groups/invite/${id}/${pag}`;
    return this.http.get<any[]>(url);
  }

  getSentSolicitions(id:number,pag:number){
    let url = `http://localhost:3003/API/groups/sent/${id}/${pag}`;
    return this.http.get<any[]>(url);
  }
  
  createGroup(id:number, grupo:any){
    let url = `http://localhost:3003/API/groups/${id}`;

    return this.http.post<any[]>(url,grupo)
  }

  deleteGroupRelation(id_user:number,id_group:number){
    let url = `http://localhost:3003/API/groups/${id_group}/${id_user}`;
    
    return this.http.delete<any[]>(url);
  }

  acceptGroupInvitation(id_user:number,id_group:number){
    let url =`http://localhost:3003/API/groups/invite/${id_group}/${id_user}`;
    
    return this.http.put<any[]>(url,{});
  }
}
