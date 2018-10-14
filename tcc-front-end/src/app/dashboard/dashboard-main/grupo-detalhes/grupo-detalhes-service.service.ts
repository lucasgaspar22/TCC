import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GrupoDetalhesService {

  constructor(private http:HttpClient) { }

  getGroupDetails(id_grupo:number){
    let url = `http://localhost:3003/API/groups/${id_grupo}/0`;
    return this.http.get<any[]>(url);
  }

}
