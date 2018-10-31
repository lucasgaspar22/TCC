import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http:HttpClient) { }

  getNewFriendsNumber(id:number){
    let url=`http://localhost:3003/API/user/get_friend_solicitations_recieved/${id}`;
    return this.http.get<any[]>(url);
  }

  getNewGroupNumber(id:number){
    let url=`http://localhost:3003/API/user/get_group_invitations/${id}`;
    return this.http.get<any[]>(url);
  }

  getNewIndicationNumber(id:number){
    let url=`http://localhost:3003/API/user/get_depo_solicitations/${id}`;
    return this.http.get<any[]>(url);
  }
}
