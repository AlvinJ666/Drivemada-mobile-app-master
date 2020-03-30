import {Component, Input, OnInit} from '@angular/core';
import {Api, Settings, User, Utils} from '../../providers';
import {MessagingPage} from '../messaging/messaging.page';
import {Router} from '@angular/router';
import {IonDatetime} from '@ionic/angular';
import {Msgs} from '../../providers/msgs/msgs';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {


  constructor(public msgs: Msgs, public user: User, public utils: Utils) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // while on page we could increase thread refresh rate?

  }

  ionViewWillLeave() {
    // when leaving page we could decrease thread refresh rate?
  }

}
