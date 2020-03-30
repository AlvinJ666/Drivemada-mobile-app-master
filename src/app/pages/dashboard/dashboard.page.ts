import { Component, OnInit } from '@angular/core';
import {Api, User, Utils} from '../../providers';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  navbar:HTMLElement;
  content:HTMLElement;
  selectedTab:string = "reviews";
  selectedWOTab:string = "pending";
  sticky: number;

  constructor(public user: User, public router: Router, public utils: Utils) { }

  ngOnInit() {
  }

  swapTab(tabId)
  {
    this.selectedTab = tabId;
  }
  swapWOTab(tabId){
    this.selectedWOTab = tabId;
  }

  scroll(ev){

    if(this.navbar == null){
      // Get the navbar
      this.navbar = document.getElementById('navbar');
      this.content = document.getElementById('content');
      // Get the offset position of the navbar
      this.sticky= this.navbar.offsetTop - 55;
    }

    if (ev.detail.scrollTop >= this.sticky) {
      this.navbar.classList.add("sticky");
      this.content.classList.add("stickyPadding");
    }
    else {
      this.navbar.classList.remove("sticky");
      this.content.classList.remove("stickyPadding");
    }
  }



    upload(img: any) {
        console.log("Clicked");

    }

  deleteImage(img: any, pos: any) {
    console.log("delete Clicked");
  }
  viewProfile(){
    this.router.navigateByUrl('profile');
  }
}
