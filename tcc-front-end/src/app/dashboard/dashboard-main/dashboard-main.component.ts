import { Component, OnInit } from '@angular/core';
import { DashboardMainService } from './dashboard-main-service.service';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css']
})
export class DashboardMainComponent implements OnInit {

  id:number=0;
  friends_num:number = 0 ;
  new_frinds_num:number = 0;
  group_num:number = 0;
  new_group_num:number = 0 ;
  indication_num:number = 0 ;
  new_indication_num:number = 0 ;

  constructor(private dashboardMainService: DashboardMainService) { }

  ngOnInit() {
    this.id = JSON.parse(localStorage.getItem('user')).node._id;
    this.getAllNumbers();
  
  }

  getAllNumbers(){
    // Get FriendsNumber
    this.dashboardMainService.getFriendsNumber(this.id).subscribe(res=>{
      if(res.length>0){
        this.friends_num=res[0].friends;
      }
    });

    this.dashboardMainService.getNewFriendsNumber(this.id).subscribe( res =>{
      if(res.length>0){
        this.new_frinds_num=res[0].friends;
      }
    });


    // Get Indication Number
    this.dashboardMainService.getIndicationNumber(this.id).subscribe( res => {
      if(res.length>0){
        this.indication_num= res[0].depos;
      }
    });

    this.dashboardMainService.getNewIndicationNumber(this.id).subscribe( res =>{
      if(res.length>0){
        this.new_indication_num = res[0].depos
      }
    });

    this.dashboardMainService.getGroupNumber(this.id).subscribe( res =>{
      if(res.length>0){
        this.group_num = res[0].groups
      }
    });

    this.dashboardMainService.getNewGroupNumber(this.id).subscribe( res =>{
      if(res.length>0){
        this.new_group_num = res[0].invites
      }
    });

    


  }

}
