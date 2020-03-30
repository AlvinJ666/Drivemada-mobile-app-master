import {Component} from '@angular/core';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {User, Utils} from '../../providers';
import {Router} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';




@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        TranslateModule],

    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

@Component({
    selector: 'page-signup',
    templateUrl: 'registration.page.html',
    styleUrls: ['registration.page.scss', '../../../theme/launch.scss']
})
export class RegistrationPage {

    account: {
        email: string, password: string, passwordConfirm: string, firstName: string, lastName: string,
        birthDate: string, phoneNumber: string, addressLine1: string, addressLine2: string,
        city: string, area: string, postalCode: string, country: string
    } = {

        email: '',
        password: '',
        passwordConfirm: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        phoneNumber: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        area: '',
        postalCode: '',
        country: ''

        /*email: 'myepmail12345@gmail.com',
        password: 'p@s5w0rd',
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '1994-01-01',
        phoneNumber: '613-123-4567',
        addressLine1: '123 Fake St.',
        addressLine2: '1500',
        city: 'Ottawa',
        area: 'Ontario',
        postalCode: 'K2P 1C4',
        country: 'Canada'*/

    };

    // tracks if the button action is being processed
    signupClicked = false;
    // tracks if password and confirm are matched
    private passConfMatch = true;

    // Our translated text strings
    private signupErrorString: string;
    private emailDuplicateErrorString: string;

    /*@ViewChild('regEmail') registerEmail;
    @ViewChild('passwordConfirm') registerConfirm;*/

    constructor(
        public user: User,
        public utils: Utils,
        public router: Router,
        public translateService: TranslateService) {
        this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
            this.signupErrorString = value;
        });
        this.translateService.get('EMAIL_DUPLICATE_ERROR').subscribe((value) => {
            this.emailDuplicateErrorString = value;
        });
    }

    doSignup() {

        let isRequiredFieldEmpty = false;
        let isFormatRight = true;

        // make sure that all required fields are filled
        if ( this.account.email === '') {
            this.alarmUserToFillField('regEmail');
            isRequiredFieldEmpty = true;
        }
        if ( this.account.password === '') {
            this.alarmUserToFillField('regPassword');
            isRequiredFieldEmpty = true;
        }
        if ( this.account.passwordConfirm === '') {
            this.alarmUserToFillField('passConf');
            isRequiredFieldEmpty = true;
        }
        if ( this.account.firstName === '' ) {
            this.alarmUserToFillField('regFirstName');
            isRequiredFieldEmpty = true;
        }
        if ( this.account.lastName === '' ) {
            this.alarmUserToFillField('regLastName');
            isRequiredFieldEmpty = true;
        }
        if ( this.account.birthDate === '' ) {
            this.alarmUserToFillField('date');
            isRequiredFieldEmpty = true;
        }
        if ( this.account.addressLine1 === '' ) {
            this.alarmUserToFillField('regAddLnOne');
            isRequiredFieldEmpty = true;
        }
        if ( this.account.postalCode === '') {
            this.alarmUserToFillField('regPostCd');
            isRequiredFieldEmpty = true;
        }
        if (isRequiredFieldEmpty === true) {
            return;
        }
        if (!this.account.email.match('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$')) {
            document.querySelector('#regEmail').setAttribute('style', 'background-color: #f53d3d !important');
            document.querySelector('#credentials').setAttribute('style', 'display:inline-block');
            isFormatRight = false;
        }
        if (!this.account.password.match('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&]).{8,20}')) {
            document.querySelector('#regPassword').setAttribute('style', 'background-color: #f53d3d !important');
            document.querySelector('#credentials').setAttribute('style', 'display:inline-block');
            isFormatRight = false;
        }
        if (!this.account.passwordConfirm.match('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&]).{8,20}')) {
            document.querySelector('#passConf').setAttribute('style', 'background-color: #f53d3d !important');
            document.querySelector('#credentials').setAttribute('style', 'display:inline-block');
            isFormatRight = false;
        }
        if (isFormatRight === false) {
            console.log('Format is not correct');
            return;
        }
        this.signupClicked = true;
        this.user.signup(this.account).subscribe((resp) => {
            document.querySelector('#credentials').setAttribute('style', 'display: none');
            document.querySelector('#location').setAttribute('style', 'display: none');
            this.router.navigateByUrl('login');
            this.utils.presentAlert('Please check your email to validate your account.');
            this.signupClicked = false;
        }, (err) => {
            // if the email already exists
            if (err.status === 409) {
                this.utils.toast(this.emailDuplicateErrorString);
            }if ( err.status === 500) {
                if ( err.error.error.message.includes('Cannot find location from address:')) {
                    document.querySelector('#regPostCd').setAttribute('style', 'background-color: #f53d3d !important');
                    document.querySelector('#regAddLnOne').setAttribute('style', 'background-color: #f53d3d !important');
                    document.querySelector('#location').setAttribute('style', 'display:inline-block');
                    this.utils.toast('Cannot find location from address');
                    console.log('The address can not be found.' + err.error.error.message);
                }
            }
            this.signupClicked = false;
        });
    }

    displayPasswordFormat() {
        // console.log('click event fired on display password format dispay');

        // if password and confirm don't match, continue displaying the checkmarks
        if (!this.passConfMatch) {
            return;
        }
        document.querySelector('#regPasswordFormat').setAttribute('style', 'display:inline');
        document.querySelector('#passwordConfirmDiv').setAttribute('style', 'display:block');
        document.querySelector('#passNumber').setAttribute('style', 'display: none');
        document.querySelector('#passLowercase').setAttribute('style', 'display: none');
        document.querySelector('#passUpercase').setAttribute('style', 'display: none');
        document.querySelector('#passCharNum').setAttribute('style', 'display: none');
        document.querySelector('#passSpecChar').setAttribute('style', 'display: none');
    }

    passwordConfirmCheck() {
        if (!(this.account.password === this.account.passwordConfirm)) {
            this.passConfMatch = false;
            this.utils.toast('password does not match');
            document.querySelector('#passConfEq').setAttribute('style', 'display:inline-block');
            console.log('password does not match.');
            return false;
        } else {
            this.passConfMatch = true;
            // if everything is fine, close the format guide and confirm
            document.querySelector('#passConfEq').setAttribute('style', 'display:none');
            document.querySelector('#regPasswordFormat').setAttribute('style', 'display:none');
            document.querySelector('#passwordConfirmDiv').setAttribute('style', 'display:none');
            return true;
        }
    }

    writeCheckmark() {
        if ((this.account.password).match('(?=.*\\d)')) {
            document.querySelector('#passNumber').setAttribute('style', 'display: inline');
        } else {
            document.querySelector('#passNumber').setAttribute('style', 'display: none');
        }
        if ((this.account.password).match('(?=.*[a-z])')) {
            document.querySelector('#passLowercase').setAttribute('style', 'display: inline');
        } else {
            document.querySelector('#passLowercase').setAttribute('style', 'display: none');
        }
        if ((this.account.password).match('(?=.*[A-Z])')) {
            document.querySelector('#passUpercase').setAttribute('style', 'display: inline');
        } else {
            document.querySelector('#passUpercase').setAttribute('style', 'display: none');
        }
        if ((this.account.password).match('(?=.*[@$!%*#?&])')) {
            document.querySelector('#passSpecChar').setAttribute('style', 'display: inline');
        } else {
            document.querySelector('#passSpecChar').setAttribute('style', 'display: none');
        }
        if ((this.account.password).length > 7 ) {
            document.querySelector('#passCharNum').setAttribute('style', 'display: inline');
        } else {
            document.querySelector('#passCharNum').setAttribute('style', 'display: none');
        }
        document.querySelector('#passConfEq').setAttribute('style', 'display:none');
        document.querySelector('#passConf').setAttribute('value', '');
        document.querySelector('#regPassword').setAttribute('style', '');
    }

    closePassConfBubble(){
        document.querySelector('#passConfEq').setAttribute('style', 'display:none');
        document.querySelector('#passConf').setAttribute('style', '');
    }

    checkEmail() {
        if (this.account.email == "") return;
        // console.log('ionBlur event fired on email check');
        // if the format of the email doesn't match, stay on the field
        if (!(this.account.email).match('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')) {
            /*setTimeout(() => {
                this.registerEmail.setFocus();
            }, 150);
            console.log('Email format is not correct.')*/
            return;
        }

        // check if email already exists in database
        this.utils.checkEmail(this.account.email).subscribe((res: any) => {
            console.log('Email duplication');
            document.querySelector('#emailBubble').setAttribute('style', 'display: inline-block');
            }, err => {
            console.log('Email check: email does not exist in the database. Registration goes on.');
        });
    }

    closeEmailBubble() {
        document.querySelector('#emailBubble').setAttribute('style', 'display: none');
        document.querySelector('#regEmail').setAttribute('style', '');
    }

    dateType(){
        document.querySelector('#date').setAttribute('type', 'date');
    }

    /*checkPhoneNo(){
        this.utils.checkPhoneNumber(this.account.phoneNumber).subscribe((res: any) => {
            console.log('Phone number duplication');
            document.querySelector('#PhoneBubble').setAttribute('style', 'display: inline-block');
        }, err=>{
            document.querySelector('#regPhoneFormat').setAttribute('style', 'display:none');
            console.log('Phone number does not exist in the database. Registration goes on.');
        });
    }*/

    /*closePhoneBubble() {
        document.querySelector('#PhoneBubble').setAttribute('style', 'display:none');
    }

    displayPhoneFormat() {
        document.querySelector('#regPhoneFormat').setAttribute('style', 'display:inline-block');
    }

    hidePhoneFormat() {
        if (this.account.phoneNumber.match("^((?!(0))[0-9]{10})$"))
            document.querySelector('#regPhoneFormat').setAttribute('style', 'display:none');
    }*/

    chngBakgrndClr(id: any) {
        id = '#' + id;
        document.querySelector(id).setAttribute('style', 'background-color:');
    }

    alarmUserToFillField(id: any) {
        id = '#' + id;
        document.querySelector(id).setAttribute('style', 'background-color: #f53d3d !important');
        document.querySelector('#credentials').setAttribute('style', 'display:inline-block');
    }

    hideField(id: any) {
        id = '#' + id;
        document.querySelector(id).setAttribute('style', 'display: none');
    }
}
