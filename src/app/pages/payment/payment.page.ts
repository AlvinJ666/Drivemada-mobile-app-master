import {Component, OnInit} from '@angular/core';
import {Msgs, Api, User, Utils} from '../../providers';
import {Router} from '@angular/router';




@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

    public cardNumber: string;
    public exprireDate: string; // default of 20km
  
    public CVV:string;
    private disableBtn: boolean;
    constructor(public user: User, public api: Api, public router: Router, public utils: Utils) {
    }
  
    ngOnInit() {
      let isRequiredFieldEmpty = false;
  
      if ( this.cardNumber=='')//this.exprireDate==''&& this.CVV=='' ) 
      {
        this.alarmUserToFillField('cardnum');
        isRequiredFieldEmpty = true;
  
      }
      if ( this.exprireDate=='')//this.exprireDate==''&& this.CVV=='' ) 
      {
        this.alarmUserToFillField('expiredate');
        isRequiredFieldEmpty = true;
  
      }
      if ( this.CVV=='')//this.exprireDate==''&& this.CVV=='' ) 
      {
        this.alarmUserToFillField('cvv');
        isRequiredFieldEmpty = true;
  
      }
      else{

        this.display()
      }
    }
  
  display(){

    document.querySelector("cn").innerHTML = this.cardNumber;
    document.querySelector("exp").innerHTML = this.exprireDate;
    document.querySelector("cvv").innerHTML = this.CVV;

  }
    alarmUserToFillField(id: any) {
      id = '#' + id;
      document.querySelector(id).setAttribute('style', 'background-color: #f53d3d !important');
  //    document.querySelector('#credentials').setAttribute('style', 'display:inline-block');
    }
  
  
    save() {
  
      if (this.cardNumber != undefined&&
        this.exprireDate!=undefined&&
        this.CVV!=undefined &&
        this.cardNumber.match(/[0-9]/)) {
        this.disableBtn = true;
        const cardInfo = {
          cardNumber: this.cardNumber,
          cvv: this.CVV,
          exprireDate: this.exprireDate
        };
        let msg = 'Card info updated successfully';
        this.utils.toast(msg);
        // const seq = this.api.post('cardInfo', cardInfo, this.api.getAuthHeader());
        // seq.subscribe((res: any) => {
        //   this.disableBtn = false;
        // });
      } else {
        let msg = 'Sorry, card information is missing not valid.';
        this.utils.toast(msg);
      }
    }
  


  }


  