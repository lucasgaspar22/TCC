import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GrupoDetalhesService {

  constructor(private http:HttpClient) { }

  getMembersNumber(id_grupo:number){
    let url = `http://localhost:3003/API/groups/get/members/number/${id_grupo}`;
    return this.http.get<any[]>(url);
  }
  getGroupDetails(id_grupo:number){
    let url = `http://localhost:3003/API/groups/get/group/creator/${id_grupo}`;
    return this.http.get<any[]>(url);
  }
  getGroupMembers(id_grupo:number,pagina:number){
    let url = `http://localhost:3003/API/groups/members/${id_grupo}/${pagina}`;
    return this.http.get<any[]>(url);
  }
  
  getRelationgGroupUser(id_user:number,id_group:number){
    let url = `http://localhost:3003/API/groups/get/relation/type/${id_user}/${id_group}`;
    return this.http.get<any[]>(url);
  }

  askMembership(id_user:number,id_group:number){
    let url = `http://localhost:3003/API/groups/ask_membership/${id_group}/${id_user}`;
    return this.http.post<any[]>(url,{});
  }

  deleteRelationBetweenGroupUser(id_user:number,id_group:number){
    let url = `http://localhost:3003/API/groups/${id_group}/${id_user}`;
    return this.http.delete<any[]>(url);
  }

  acceptInvitation(id_user:number,id_group:number){
    let url =`http://localhost:3003/API/groups/invite/${id_group}/${id_user}`;
    return this.http.put<any[]>(url,{});
  }

  search(name_email:string, id:number){
    let url = `http://localhost:3003/API/user/search/${name_email}/${id}`;
    return this.http.get<any[]>(url);
  }

  inviteMember(id_member:number, id_grupo:number){
    let url =`http://localhost:3003/API/groups/invite/${id_grupo}/${id_member}`;
    return this.http.post<any[]>(url,{});
  }

}
