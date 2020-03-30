import {Injectable} from '@angular/core';
import {Api} from '../api/api';
import {Settings} from '../settings/settings';
import {HttpHeaders} from '@angular/common/http';
import {Utils} from '../utils/utils';
import {share} from 'rxjs/operators';
import {Events} from '../events/events';
import {Msgs} from '../msgs/msgs';
import {MockData} from '../mockData/mockData';

@Injectable()
export class User {

    loginCredentials = {'email' : 'vers0017@algonquinlive.com', 'password' : 'Newpwd!23'};

    self = new Self(this.api);

    userProfiles: Array<Profiles> = [];

    constructor(public api: Api, public settings: Settings, public utils: Utils, public events: Events, public msgs: Msgs) {
    }

    /**
     * Send a POST request to our login endpoint with the data
     * the user entered on the form.
     */
    login() {
        const formData = this.utils.jsonToFormData(this.loginCredentials);
        const seq = this.api.post('auth', formData).pipe(share());

        seq.subscribe((res: any) => {
            // If the API returned a successful response, mark the user as logged in
            if (res.data.token !== null) {
                this._loggedIn(res);
            } else {
            }
        }, err => {
            console.error('ERROR', err);
        });

        return seq;
    }

    /**
     * Send a POST request to our signup endpoint with the data
     * the user entered on the form.
     */
    signup(accountInfo: any) {
        const formData = this.utils.jsonToFormData(accountInfo);
        const seq = this.api.post('users', formData).pipe(share());
        seq.subscribe((res: any) => {
            this.loginCredentials.email = accountInfo.email;
            this.loginCredentials.password = accountInfo.password;
        }, err => {
            console.error('ERROR', err);
        });

        return seq;
    }

    /**
     * Log the user out, which forgets the session
     */
    logout() {
        this.api.setAuthToken(null);
        this.settings.load().then(() => {
            this.settings.setValue('password', null);
        });
        this.self = new Self(this.api);
    }




    /**
     * Process a login/signup response to store user data
     */
    private _loggedIn(resp) {
        this.api.setAuthToken(resp.data.token); // save auth token for this session
        // save the email/password in local storage
        this.settings.load().then(() => {
            this.settings.setValue('email', this.loginCredentials.email);
            this.settings.setValue('password', this.loginCredentials.password);
        });
        this.self.startUpdates();
        this.msgs.getThreads();
        this.events.LoadCalenderEvents();
    }

    public loadUserProfile(id: number) {
        if (this.userProfiles[id] === undefined) {
            this.userProfiles[id] = <Profiles>{location: {}};
            const endpoint = 'users/' + id;
            this.api.get(endpoint, null, this.api.getAuthHeader()).subscribe((res: any) => {
                this.userProfiles[id] = res.data;
            });
        }
    }


}

class Self {

    profile = {
        id: '',
        email: '',
        profilePicture: '',
        registerDate: '',
        avgRating: '',
        totalReviews: '',
        isCaregiver: '',
        firstName: '',
        lastName: '',
        dob: {
            year: '',
            month: '',
            day: ''
        },
        phone: '',
        about: '',
        location: {
            addressLine1: '',
            addressLine2: '',
            city: '',
            area: '',
            postalCode: '',
            country: ''
        },
    };

    myShiftsList: Array<MyShits> = [];
    myReviewsList: Array<Reviews> = [];
    myPhotos: Array<Photos> = [];


    constructor(public api: Api) {

    }

    public startUpdates() {
        this.getProfile();
        this.getMyShifts();
        this.getMyPhotos();
        // setTimeout(this.startUpdates, 1000);
    }

    private getMyShifts() {
        const endpoint = 'users/me/shifts';
        this.api.get(endpoint, null, this.api.getAuthHeader()).subscribe((res: any) => {
            this.myShiftsList = res.data.items;
            this.myShiftsList.sort((a, b) => a.startTimeLocal.getTime() - b.startTimeLocal.getTime());
            console.log(this.myShiftsList);
        });
    }

    /**
     * Send a request to get current user profile data.
     */
    private getProfile() {
        const endpoint = 'users/me';
        this.api.get(endpoint, false, this.api.getAuthHeader()).subscribe((res: any) => {
            this.profile = res.data;
            this.getReviews(this.profile.id);
        });
    }

    private getReviews(id: string) {
        const endpoint = 'users/' + id + '/reviews';
        this.api.get(endpoint, null, this.api.getAuthHeader()).subscribe((res: any) => {
            this.myReviewsList = res.data.items;
        });
    }

    private getMyPhotos() {
        // not yet implemented in api so we generate a fake list only
        const seq = MockData.getMockPhotos();
        seq.subscribe((res: any) => {
            this.myPhotos = res.data.items;
        });
    }


}

interface Photos {
    'url': string;
}

interface MyShits {
    'id': number;
    'isServiceProvider': boolean;
    'startTimeUTC': Date;
    'endTimeUTC': Date;
    'startTimeLocal': Date;
    'endTimeLocal': Date;
    'clientName' : String;
    'jobAddress' : String;
}

interface Reviews {
    'id': number;
    'idFrom': number;
    'from': string;
    'rating': number;
    'text': string;
    'dateUTC': string;
}

interface Profiles {
    id: number;
    profilePicture: string;
    registerDate: string;
    avgRating: number;
    totalReviews: number;
    isCaregiver: false;
    firstName: string;
    lastName: string;
    about: string;
    location: {
        city: string;
        area: string;
        postalCode: string;
        country: string;
    },
}
