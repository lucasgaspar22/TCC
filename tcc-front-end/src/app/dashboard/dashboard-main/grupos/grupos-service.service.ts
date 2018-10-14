import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  constructor(private http:HttpClient) { }


  getAllGroups(id:number,pag:number){
    let url = `http://localhost:3003/API/groups/${id}/${pag}`;
    return this.http.get<any[]>(url);
  }

  createGroup(id:number, grupo:any){
    let url = `http://localhost:3003/API/groups/${id}`;

    return this.http.post<any[]>(url,grupo)
  }
}
