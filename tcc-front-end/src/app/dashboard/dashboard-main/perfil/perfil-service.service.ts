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
}
