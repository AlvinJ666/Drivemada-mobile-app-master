import {Component, OnInit} from '@angular/core';
import {Msgs, Api, User, Utils} from '../../providers';
import {Router} from '@angular/router';




@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  public postalCode: '';
  public radius: 20; // default of 20km

  workOffersArray: Array<WorkOffers> = [];

  private disableBtn: boolean;

  constructor(public msgs: Msgs, public user: User, public api: Api, public router: Router, public utils: Utils) {
  }

  ngOnInit() {
    let isRequiredFieldEmpty = false;

    if ( this.postalCode === '') {
      this.alarmUserToFillField('regPostCd');
      isRequiredFieldEmpty = true;

    }
  }


  alarmUserToFillField(id: any) {
    id = '#' + id;
    document.querySelector(id).setAttribute('style', 'background-color: #f53d3d !important');
    document.querySelector('#credentials').setAttribute('style', 'display:inline-block');
  }


  search() {

    if (this.postalCode !== undefined && this.postalCode.match(/[A-Za-z][0-9][A-Za-z][0-9][A-Za-z][0-9]/)) {
      this.disableBtn = true;
      const searchData = {
        postalCode: this.postalCode,
        radius: this.radius
      };
      const seq = this.api.post('work-offers', searchData, this.api.getAuthHeader());
      seq.subscribe((res: any) => {
        this.workOffersArray = res.data.items;
        this.loadWorkOfferProfiles();
        this.disableBtn = false;
      });
    } else {
      let msg = this.postalCode + ' is not a valid postal Code.';
      if (this.postalCode === undefined) {
         msg = 'You must enter a postal code to search';
      }
      this.utils.toast(msg);
    }
  }

  loadWorkOfferProfiles() {
    for (let i = 0; i < this.workOffersArray.length; i++) {
      this.user.loadUserProfile(this.workOffersArray[i].idUserOffering);
    }
  }



}

export interface WorkOffers {
  id: number;
  title: string;
  userOffering: string;
  idUserOffering: number;
  careType: string;
  wage: number;
  startTimeUTC: string;
  endTimeUTC: string;
  startTimeLocal: string;
  endTimeLocal: string;
  timeZone: string;
  description: string;
  responsibilities: string;
  wardDetails: string;
  rules: string;
  postalCode: string;
  isContinuous: boolean;
  km: string;
}



