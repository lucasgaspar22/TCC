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

  getUserGroups(id:number, pag:number){
    let url_get_groups = `http://localhost:3003/API/groups/${String(id)}/${String(pag)}`;

    return this.http.get<any[]>(url_get_groups);
  }
}
