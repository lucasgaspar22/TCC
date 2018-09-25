import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  id:any;
  usuario:any = {};
  url_get_usuario = "http://localhost:3003/API/user/get_by_id/";
  constructor(private http:HttpClient, private route:ActivatedRoute, private toastr:ToastrService) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.id = Number(params.id);
    });
    this.url_get_usuario = this.url_get_usuario + String(this.id);
    
    this.http.get<any[]>(this.url_get_usuario).subscribe(res=>{
      this.usuario = res[0];
      console.log(this.usuario);
    });

  }

}
