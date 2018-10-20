import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient) { }

  getUserById(id:number){
    let url_get_usuario = "http://localhost:3003/API/user/get_by_id/" + String(id);
    return  this.http.get<any[]>(url_get_usuario);
  }

  getFriends(id_logado:number,pagina:number){
    let url = `http://localhost:3003/API/is_friend/${id_logado}/${pagina}`;
    return this.http.get<any[]>(url);
  }


  getUserDepos(id:number, pag:number){
    let url_get_depos = `http://localhost:3003/API/depoimento/has_depo/${String(id)}/${String(pag)}`;

    return this.http.get<any[]>(url_get_depos);
  }

  getUserDeposNumbers(id:number){
    let url_count_depos = `http://localhost:3003/API/user/get_depo_number/${id}`;

    return this.http.get<any[]>(url_count_depos);
  }

  getUserGroups(id:number, pag:number){
    let url_get_groups = `http://localhost:3003/API/groups/${String(id)}/${String(pag)}`;

    return this.http.get<any[]>(url_get_groups);
  }

  getUserGroupsNumbers(id:number){
    let url_count_groups = `http://localhost:3003/API/user/get_group_number/${id}`;

    return this.http.get<any[]>(url_count_groups);
  }

  getUserFriendsNumbers(id:number){
    let url_count_friends = `http://localhost:3003/API/user/get_friend_number/${id}`;

    return this.http.get<any[]>(url_count_friends);
  }

  getUserProfileRelation (idProfile:number, idLogado:number){
    let url_get_relation = `http://localhost:3003/API/user/get_relation/${idProfile}/${idLogado}`;

    return this.http.get<any[]>(url_get_relation);
  }


  askAsFriend(idProfile:number, idLogado:number){
    let url_ask_as_friend = `http://localhost:3003/API/asked_as_friend/${idLogado}/${idProfile}`;

    return this.http.post<any[]>(url_ask_as_friend,{});
  }

  deleteSolicitation(idProfile:number,idLogado:number){
    let url_delete_solicitaion = `http://localhost:3003/API/asked_as_friend/${idProfile}/${idLogado}`;

    return this.http.delete<any[]>(url_delete_solicitaion);
  }

  deleteFriendship(idProfile:number,idLogado:number){
    let url_delete_friendship = `http://localhost:3003/API/is_friend/${idProfile}/${idLogado}`;
    
    return this.http.delete<any[]>(url_delete_friendship);
  }

  sendIndication(idLogado: number, idPerfil:number, indicacao:any){
    let url_send_depo = `http://localhost:3003/API/depoimento/${idLogado}/${idPerfil}`;

    return this.http.post<any[]>(url_send_depo,indicacao);
  }
}
