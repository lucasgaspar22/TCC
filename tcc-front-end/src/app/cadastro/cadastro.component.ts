import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import * as md5 from '../../../node_modules/md5';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  user_img: string = "";// = "../../assets/images/menu_user.png";

  constructor(private http:HttpClient, private toastr:ToastrService) { }

  ngOnInit() {
  }

  cadastrar (form:any){
    let email = form.email;
    let senha = form.senha;
    let nome = form.nome;
    let foto = this.user_img;
    let profissao = form.profissao;
    let local = form.local;

    let pre_token = email+senha;
    let token = md5(pre_token);

    let new_user = {
      "nome": nome,
      "email": email,
      "senha": senha,
      "foto":  foto,
      "profissao": profissao,
      "local":  local
    };

    this.http.post<any[]>("http://localhost:3003/API/user",new_user).subscribe(res =>{
      if( res.length !== 0 ){
        this.toastr.success('Sucesso, seja bem vindo ao ConnectU!','Deu bom!',{
          timeOut:5000
        });
      }else{
        this.toastr.error('Ops, algo deu muito errado :(!','Deu ruim!',{
          timeOut:5000
        });
      }
    })
  }


  changeListener($event) : void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.user_img = String(myReader.result);
    }
    myReader.readAsDataURL(file);
  }

}
