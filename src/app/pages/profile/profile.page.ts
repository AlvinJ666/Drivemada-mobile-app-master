import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {User} from '../../providers';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  patchSelfActive: any=false;
  api: any=  {
    id: '1',
    email: '666@qq.com',
    profilePicture: '',
    registerDate: '01-01-2020',
    avgRating: '4.9/5',
    totalReviews: '50',
    isCaregiver: 'false',
    firstName: 'Alvin',
    lastName: 'Tsu',
    dob: {
        year: '1960',
        month: '08',
        day: '07'
    },
    phone: '613666666',
    about: 'I am an old man from Ottawa. I like to use caremada',
    location: {
        addressLine1: 'Baseline 1975',
        addressLine2: '',
        city: 'Ottawa',
        area: 'Nepean',
        postalCode: 'K2C3C9',
        country: 'Canada'
    },
};;
  utils: any;
  
  constructor(public user: User, private location: Location) { }

  backArrow() {
    this.location.back();
  }

    /**
   * Send a request to get current user data.
   */
getCurrentUserData(){

}

  
  patchSelf(data: any) {

    if (!this.patchSelfActive) {
      const endpoint = 'users/me';
      const updateData = {
        // "user_info" table
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate,
        phoneNumber: data.phoneNumber,
        about: data.about,
        // "location_data" table
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        area: data.area,
        postalCode: data.postalCode,
        country: data.country,
      };
      let formData = this.utils.jsonToFormData(updateData);
      const seq = this.api.patch(endpoint, updateData, this.api.getAuthHeader());
      seq.subscribe((res: any) => {
        // handle response?
        this.utils.parseRes(res);
        this.patchSelfActive = false;
      }, err => {
        // handle error?
        this.patchSelfActive = false;
        this.utils.parseError(err);
      });
      return seq;
    }
  }

  updateSelfExample() {
    // user data is all optional
    const userInfo = {
      firstName: 'Jim',
      lastName: 'Watson',
      birthDate: '01/01/1921',
      phoneNumber: '6137371111',
      about: 'Im the mayor of ottawa, Im old.'
    };
    this.patchSelf(userInfo);
  }

  updateSelfAddressExample() {
    // User's location information -- all fields are required (could be '')
    const location = {
      addressLine1: '123 test', // User's address line 1
      addressLine2: 'apt 3', // User's address line 2 (i.e. apartment number)
      city: 'Ottawa', // User's city
      area: 'ON', // User's two letter state/province code
      postalCode: 'K2G4N6', // User's postal code
      country: 'Canada' // User's two letter country code
    };
    this.patchSelf(location);
  }



  ngOnInit() {
      //this.user.self.profile=this.getCurrentUserData();
  }

  Arr(number) {
    return Array(number);
  }
}
