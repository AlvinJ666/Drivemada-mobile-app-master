import { Component, OnInit } from '@angular/core';
import {Alert} from 'selenium-webdriver';
import {Utils} from '../../providers';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss', '../../../theme/launch.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordEmail = '';
  buttonClicked = false;
  constructor(public utils: Utils) { }

  ngOnInit() {
    //document.querySelector('.test').setAttribute('style','margin-top: 0%');
    //document.querySelector('.popover-content').shadowRoot.querySelector('.select-icon-inner').setAttribute('style', 'margin-top:10px');
  }

/** Send a reset password request to reset a users password
 */
  // pretending it's a valid email for now
  // attempt to reset password
  resetPassword() {
    if (this.forgotPasswordEmail.match(/[\w-]+@([\w-]+.)+[\w-]+/)) {
      this.buttonClicked = true;
      console.log("button was clicked");
      this.utils.presentAlert('Please check your email');
      this.utils.dismissPopover(ForgotPasswordComponent);
    }else{
        console.log("mattern doesn't match");
    }
  }
}



