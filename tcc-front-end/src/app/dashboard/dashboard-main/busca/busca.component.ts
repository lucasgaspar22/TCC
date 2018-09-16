import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.css']
})
export class BuscaComponent implements OnInit {

  id_usuario_logado:number;
  usuarios: any = [];
  encontrou_usuarios:boolean = false;
  constructor(private http: HttpClient, private toastr:ToastrService) { }

  ngOnInit() {
    this.id_usuario_logado = JSON.parse(localStorage.getItem('user')).node._id;
    this.encontrou_usuarios = false;
  }

  search(form:any){
    let name_email = form.email_name;

    let url = `http://localhost:3003/API/user/search/${name_email}`;

    this.http.get<any[]>(url).subscribe(res=>{
      if(res.length>0){
        console.log(res)
        this.usuarios = res;
        this.encontrou_usuarios = true;
      }else{
        this.toastr.error("Não encontramos ninguém...","Ops",{timeOut:5000});
        this.encontrou_usuarios = false;
      }
    })
  }

}
