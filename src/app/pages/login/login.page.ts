import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {User, Utils} from '../../providers';
import {Router} from '@angular/router';
import {ForgotPasswordComponent} from '../../components/forgot-password/forgot-password.component';
//import * as mysql from 'mysql';//npm install @types/mysql --save-dev
@Component({
    selector: 'page-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss', '../../../theme/launch.scss']
})

export class LoginPage {
    // tracks if the button action is being processed
    loginClicked = false;

    // Our translated text strings
    private loginErrorString: string;

    constructor(
        public user: User,
        public utils: Utils,
        public router: Router,
        public translateService: TranslateService) {
        this.translateService.get('LOGIN_ERROR').subscribe((value) => {
            this.loginErrorString = value;
        });
    }


    // Attempt to login in through our User service
    doLogin() {
        this.loginClicked = true;
        let tempemail:string=(<HTMLInputElement><unknown>document.getElementsByName("email")).value;
        let temppwd:string=(<HTMLInputElement><unknown>document.getElementsByName("password")).value;

        // this.user.loginCredentials.email=tempemail;
        // this.user.loginCredentials.password=temppwd;

        this.user.login().subscribe((resp) => {
                this.router.navigateByUrl('tabs/dashboard');
                this.loginClicked = false;
        }, (err) => {
            // Unable to log in
           // code 403? this.utils.presentAlert('Please check your email to validate your account.');
           this.utils.toast(this.loginErrorString);
            this.loginClicked = false;
        });
    }

    openForgotPasswordPopover() {
        
        this.utils.presentPopover(null , ForgotPasswordComponent, 'reset-password-popover' );



    }



}
