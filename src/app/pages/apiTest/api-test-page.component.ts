import {Component} from '@angular/core';
import {Api, Settings, User, Utils} from '../../providers';
import {Router} from '@angular/router';

@Component({
    selector: 'app-rest',
    templateUrl: 'api-test-page.component.html',
    styleUrls: ['api-test-page.component.scss']
})

export class ApiTestPage {

    // flags to prevent double request before first is acted on

    postUserActive = false;
    postWorkOffersActive = false;
    deleteWorkMessageActive = false;
    getSelfActive = false;
    getReviewsActive = false;
    patchSelfActive = false;
    postReviewActive = false;
    getCareTypesActive = false;
    postThreadMessageActive = false;
    postThreadActive = false;
    getBookedWorkOffersClientActive = false;
    getBookedWorkOffersProviderActive = false;
    getMessageActive = false;
    postMessageActive = false;
    resetPasswordActive = false;
    getWorkOfferHistoryProviderActive = false;


    constructor(public api: Api, public settings: Settings, public utils: Utils, public user: User, public router: Router) {
    }


    /*** REGISTATION PAGE API TESTS ***/
    /**
     * Send a POST request to our user endpoint with the data
     * the user entered on the form for registration.
     */
    postUser(data: any) {
        if (!this.postUserActive) {
            this.postUserActive = true;
            const formData = this.utils.jsonToFormData(data);
            const seq = this.api.post('users', formData);
            seq.subscribe((res: any) => {
                // handle response?
                this.utils.parseRes(res);
                this.utils.toast(JSON.stringify(res));
                this.postUserActive = false;
            }, err => {
                // handle error?
                this.postUserActive = false;
                this.utils.toast(JSON.stringify(err));
                this.utils.parseError(err);
            });
            return seq;
        }
    }

    postUserExample() {
        const regData = {
            email: 'myemail12345@gmail.com',
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
            country: 'Canada'
        };
        this.postUser(regData);
    }

    checkEmailExample() {
        const email = 'myemail12345@gmail.com';
        this.utils.checkEmail(email).subscribe( (res: any) => {
            // handle response (email exists)
            this.utils.toast(JSON.stringify(res));
            this.utils.parseRes(res);
        }, err => {
            // handle error (email does not exist)
            this.utils.toast(JSON.stringify(err));
            this.utils.parseError(err);
        });
    }

    checkPhoneNumberExample() {
        const phoneNumber = '6137371111';
        this.utils.checkPhoneNumber(phoneNumber).subscribe((res: any) => {
            // handle response (number exists)?
            this.utils.toast(JSON.stringify(res));
            this.utils.parseRes(res);
        }, err => {
            // handle error (phone number does not exist)?
            this.utils.toast(JSON.stringify(err));
            this.utils.parseError(err);
        });
    }

    /*** LOGIN PAGE API TESTS ***/
    resetPassword(data: any) {
        const formData = this.utils.jsonToFormData(data);
        // call api
        const seq = this.api.patch('users/password', formData);
        seq.subscribe((res: any) => {
            // handle response?
            this.utils.parseRes(res);
            this.utils.toast(JSON.stringify(res));
            this.resetPasswordActive = false;
        }, err => {
            // handle error?
            this.resetPasswordActive = false;
            this.utils.toast(JSON.stringify(err));
            this.utils.parseError(err);
        });
        return seq;
    }

    resetPasswordExample() {
        const data = {
            email: 'adianlock@gmail.com'
        };
        this.resetPassword(data);
    }

    /*** Add Page API TESTS ***/

    postWorkOffers(data: any) {
        if (!this.postWorkOffersActive) {
            this.postWorkOffersActive = true;
            const seq = this.api.post('work-offers', data, this.api.getAuthHeader());
            seq.subscribe((res: any) => {
                // handle response?
                this.utils.parseRes(res);
                this.postWorkOffersActive = false;
                this.utils.toast(JSON.stringify(res));
            }, err => {
                // handle error?
                this.postWorkOffersActive = false;
                this.utils.parseError(err);
                this.utils.toast(JSON.stringify(err));
            });
            return seq;
        }
    }

    postWorkOffersExample() {
        const offerData = {
            postalCode: 'L6T4A8',
            startTimeLocal: '2018-11-02 21:00:00',
            endTimeLocal: '2018-11-06 21:30:00',
            wage: '40',
            responsibility: 'My responsibilities.',
            rules: 'My rules.',
            wardDetails: 'My ward details.',
            title: 'My test API work offer',
            shortDescription: 'My short description.',
            meetingLocation: 'Somewhere',
            isContinuous: 'true',
            careType: 'Seniors'
        };
        this.postWorkOffers(offerData);
    }

    /**
     * Send a delete request to delete a user work message.
     */
    deleteWorkMessage(messageNo: string) {
        if (!this.deleteWorkMessageActive) {
            const endpoint = 'work-messages/' + messageNo;
            const seq = this.api.delete(endpoint, this.api.getAuthHeader());
            seq.subscribe((res: any) => {
                // handle response?
                this.utils.parseRes(res);
                this.utils.toast(JSON.stringify(res));
                this.deleteWorkMessageActive = false;
            }, err => {
                // handle error?
                this.deleteWorkMessageActive = false;
                this.utils.toast(JSON.stringify(err));
                this.utils.parseError(err);
            });
            return seq;
        }
    }

    deleteWorkMessageExample() {
        const messageNo = '10';
        this.deleteWorkMessage(messageNo);
    }

    getCareTypes(){
        if(this.getCareTypesActive != true){
            const endpoint = 'care-types';
            this.getCareTypesActive = true;
            const seq = this.api.get(endpoint,null, this.api.getAuthHeader());
            seq.subscribe((res: any) => {
                // handle response?
                this.utils.parseRes(res);
                this.utils.toast(JSON.stringify(res));
                this.getCareTypesActive = false;
            }, err => {
                // handle error?
                this.getCareTypesActive = false;
                this.utils.toast(JSON.stringify(err));
                this.utils.parseError(err);
            });
            console.log(seq);
            return seq;
        }
    }
    getCareTypesExample(){
        this.getCareTypes();
    }


/*** PROFILE PAGE API TESTS ***/
    /**
     * Send a request to get current user data.
     */
    getSelf() {
        if (!this.getSelfActive) {
            const endpoint = 'users/me';
            const seq = this.api.get(endpoint, null, this.api.getAuthHeader());
            seq.subscribe((res: any) => {
                // handle response?
                this.utils.parseRes(res);
                this.getSelfActive = false;
                this.utils.toast(JSON.stringify(res));
            }, err => {
                // handle error?
                this.getSelfActive = false;
                this.utils.toast(JSON.stringify(err));
                this.utils.parseError(err);
            });
            return seq;
        }
    }

    getSelfExample() {
        this.getSelf();
    }

    /**
     * Send a request to get current user data.
     */
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
            // let formData = this.utils.jsonToFormData(updateData);
            const seq = this.api.patch(endpoint, updateData, this.api.getAuthHeader());
            seq.subscribe((res: any) => {
                // handle response?
                this.utils.parseRes(res);
                this.patchSelfActive = false;
                this.utils.toast(JSON.stringify(res));
            }, err => {
                // handle error?
                this.patchSelfActive = false;
                this.utils.parseError(err);
                this.utils.toast(JSON.stringify(err));
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

/*** REVIEW COMPONENT API TESTS ***/
    /**
     * Send a request to post current user data.
     */
    postReview(id: string, reviews: any ) {
        if (!this.postReviewActive) {
            const endpoint = 'users/' + id + '/reviews';
            const seq = this.api.post(endpoint, reviews , this.api.getAuthHeader());
            seq.subscribe((res: any) => {
                // handle response?
                this.utils.parseRes(res);
                this.utils.toast(JSON.stringify(res));
                this.postReviewActive = false;
            }, err => {
                // handle error?
                this.postReviewActive = false;
                this.utils.toast(JSON.stringify(err));
                this.utils.parseError(err);
            });
            return seq;
        }
    }

    postReviewsExample() {
        const id = '398'
        const Reviews = {
            rating: '1',
            text: 'Ange is super woman and good!' // reviews can be 0 to 5 inclusive

        };
       this.postReview( id, Reviews);
    }

    /**
     * Send a request to get current user data.
     */
    getReviews(id: string) {
        if (!this.getReviewsActive) {
            const endpoint = 'users/' + id + '/reviews';
            const seq = this.api.get(endpoint, null, this.api.getAuthHeader());
            seq.subscribe((res: any) => {
                // handle response?
                this.utils.parseRes(res);
                this.utils.toast(JSON.stringify(res));
                this.getReviewsActive = false;
            }, err => {
                // handle error?
                this.getReviewsActive = false;
                this.utils.toast(JSON.stringify(err));
                this.utils.parseError(err);
            });
            return seq;
        }
    }

    getReviewsExample() {
        // we would pass in what ever id we want reviews for (for profile our own id)
        this.getReviews('398');
    }

/*** INBOX PAGE API TESTS ***/
    getThreads() {
        const endpoint = 'threads';
        const seq = this.api.get(endpoint, null, this.api.getAuthHeader());
        seq.subscribe((res: any) => {
            // handle response?
            this.utils.toast(JSON.stringify(res));
            this.utils.parseRes(res);
        }, err => {
            // handle error?
            this.utils.toast(JSON.stringify(err));
            this.utils.parseError(err);
        });
    }

    getThreadsExample() {
        this.getThreads();
    }

    postThreads(data: any) {
        if (!this.postThreadActive) {
            this.postThreadActive = true;
            const seq = this.api.post('/threads', data, this.api.getAuthHeader());
            seq.subscribe((res: any) => {
                // handle response?
                this.utils.parseRes(res);
                this.utils.toast(JSON.stringify(res));
                this.postThreadActive = false;
            }, err => {
                // handle error?
                this.utils.toast(JSON.stringify(err));
                this.postThreadActive = false;
                this.utils.parseError(err);
            });
            return seq;
        }
    }

    postThreadsExample() {
        const offerData = {
            idUserTo:386,
            text: 'testThread',

        };
        this.postThreads(offerData);
    }

    postThread(body: any) {
        if (!this.postThreadActive) {
            this.postThreadActive = true;
            const endpoint = 'threads' ;
            const formData = this.utils.jsonToFormData(body);
            const seq = this.api.post(endpoint, formData, this.api.getAuthHeader());
            seq.subscribe((res: any) => {
                // handle response?
                this.utils.parseRes(res);
                this.utils.toast(JSON.stringify(res));
                this.postThreadActive = false;
            }, err => {
                // handle error?
                this.utils.toast(JSON.stringify(err));
                this.postThreadActive = false;
                this.utils.parseError(err);
            });
            return seq;
        }
    }

    postThreadExample() {
        const body = {
            idUserTo: 1234,
            text: 'John',
        };
        this.postThread(body);
    }


/*** CALANDER PAGE API TESTS ***/

    getBookedWorkOffersClient() {
        if (!this.getBookedWorkOffersClientActive) {
            const endpoint = '/work-offers/client/booked';
            // const formData = this.utils.jsonToFormData(body);
            const seq = this.api.get(endpoint, null, this.api.getAuthHeader());
            seq.subscribe((res: any) => {
                // handle response?
                this.utils.parseRes(res);
                this.utils.toast(JSON.stringify(res));
                this.getBookedWorkOffersClientActive = false;
            }, err => {
                // handle error?
                this.getBookedWorkOffersClientActive = false;
                this.utils.toast(JSON.stringify(err));
                this.utils.parseError(err);
            });
            return seq;
        }
    }

    getBookedWorkOffersClientExample() {
        this.getBookedWorkOffersClient();
    }

  getWorkOfferHistoryProvider() {
    if (!this.getWorkOfferHistoryProviderActive) {
      const endpoint = '/work-offers/service-provider/history';
      // const formData = this.utils.jsonToFormData(body);
      const seq = this.api.get(endpoint, null, this.api.getAuthHeader());
      seq.subscribe((res: any) => {
        // handle response?
        this.utils.parseRes(res);
          this.utils.toast(JSON.stringify(res));
        this.getWorkOfferHistoryProviderActive = false;
      }, err => {
        // handle error?
        this.getWorkOfferHistoryProviderActive = false;
          this.utils.toast(JSON.stringify(err));
        this.utils.parseError(err);
      });
      return seq;
    }
  }

  getWorkOfferHistoryProviderExample() {
    this.getWorkOfferHistoryProvider();
  }

    getBookedWorkOffersProvider() {
        if (!this.getBookedWorkOffersProviderActive) {
            const endpoint = '/work-offers/service-provider/booked';
            // const formData = this.utils.jsonToFormData(body);
            const seq = this.api.get(endpoint, null, this.api.getAuthHeader());
            seq.subscribe((res: any) => {
                // handle response?
                this.utils.parseRes(res);
                this.getBookedWorkOffersProviderActive = false;
                this.utils.toast(JSON.stringify(res));
            }, err => {
                // handle error?
                this.getBookedWorkOffersProviderActive = false;
                this.utils.parseError(err);
                this.utils.toast(JSON.stringify(err));
            });
            return seq;
        }
    }

    getBookedWorkOffersProviderExample() {
        this.getBookedWorkOffersProvider();
    }


/*** MESSEGING PAGE API TESTS ***/

getThreadMessages(id: string) {
    if (!this.getMessageActive) {
        const endpoint = '/threads/' + id;
        const seq = this.api.get(endpoint, null, this.api.getAuthHeader());
        seq.subscribe((res: any) => {
            // handle response?
            this.utils.parseRes(res);
            this.utils.toast(JSON.stringify(res));
            this.getMessageActive = false;
        }, err => {
            // handle error?
            this.getMessageActive = false;
            this.utils.toast(JSON.stringify(err));
            this.utils.parseError(err);
        });
        return seq;
    }
}

    getThreadMessagesExample() {
        // we would pass in what ever id we want reviews for (for profile our own id)
        this.getThreadMessages('12');
    }

    postMessage(id: string, body: any ) {
        if (!this.postMessageActive) {
            this.postMessageActive = true;
            const endpoint = '/threads/' + id;
            const seq = this.api.post(endpoint, body , this.api.getAuthHeader());
            seq.subscribe((res: any) => {
                // handle response?
                this.utils.parseRes(res);
                this.utils.toast(JSON.stringify(res));
                this.postMessageActive = false;
            }, err => {
                // handle error?
                this.utils.toast(JSON.stringify(err));
                this.postMessageActive = false;
                this.utils.parseError(err);
            });
            return seq;
        }
    }

    postMessageExample() {
        const id = '18'
        const body = {
            idUserTo: '398',
            text: 'Tibi has officially broke the whole app!' // reviews can be 0 to 5 inclusive

        };
        this.postMessage( id, body);
    }


    postThreadMessage(id: string, body: any) {
        if (!this.postThreadMessageActive) {
            this.postThreadMessageActive = true;
            const endpoint = 'threads/' + id;
            const formData = this.utils.jsonToFormData(body);
            const seq = this.api.post(endpoint, formData, this.api.getAuthHeader());
            seq.subscribe((res: any) => {
                // handle response?
                this.utils.parseRes(res);
                this.postThreadMessageActive = false;
                this.utils.toast(JSON.stringify(res));
            }, err => {
                // handle error?
                this.postThreadMessageActive = false;
                this.utils.toast(JSON.stringify(err));
                this.utils.parseError(err);
            });
            return seq;
        }
    }

    postThreadMessageExample() {
        const id = '379';
        const body = {
            idUserTo: 1234,
            text: 'John',
        };
        this.postThreadMessage(id, body);
    }


}
