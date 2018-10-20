import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

import * as md5 from '../../../node_modules/md5';
import * as _ from   '../../../node_modules/lodash';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  is_auth:boolean = false;

  constructor(private http:HttpClient, private router:Router, private toastr:ToastrService) { }

  ngOnInit() {
  }

  async login(form:any){
    let email = form.email;
    let senha = form.senha;
   
    let pre_token = email+senha
   
    let token = md5(pre_token);
   
    let url = `http://localhost:3003/API/user/${token}`;

    await this.http.get<any[]>(url).subscribe(res=>{
      if( res.length !== 0 ){
        this.is_auth = true;
        localStorage.setItem("user", JSON.stringify(res[0]));
        this.showSuccess();
      }else{
        this.is_auth = false;
        this.showError();
      }
    });
   
    
  }

  showSuccess(){
    this.toastr.success('Sucesso, login efetuado com sucesso!','Deu bom!',{
      timeOut:2000
    });
    this.router.navigate(['/QuemIndica']);
  }

  showError(){
    this.toastr.error('Ops, verifique seu usuário e senha!','Deu ruim!',{
      timeOut:2000
    });
  }
}
