import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardMainService {

  constructor(private http:HttpClient) { }

  getFriendsNumber(id: number){
    let url=`http://localhost:3003/API/user/get_friend_number/${id}`;
    return this.http.get<any[]>(url);
  }

  getNewFriendsNumber(id:number){
    let url=`http://localhost:3003/API/user/get_friend_solicitations_recieved/${id}`;
    return this.http.get<any[]>(url);
  }

  getGroupNumber(id:number){
    let url=`http://localhost:3003/API/user/get_group_number/${id}`;
    return this.http.get<any[]>(url);
  }

  getNewGroupNumber(id:number){
    let url=`http://localhost:3003/API/user/get_group_invitations/${id}`;
    return this.http.get<any[]>(url);
  }

  getIndicationNumber(id:number){
    let url=`http://localhost:3003/API/user/get_depo_number/${id}`;
    return this.http.get<any[]>(url);
  }

  getNewIndicationNumber(id:number){
    let url=`http://localhost:3003/API/user/get_depo_solicitations/${id}`;
    return this.http.get<any[]>(url);
  }
}
