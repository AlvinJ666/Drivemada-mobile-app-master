import {Injectable} from '@angular/core';
import {Api} from '../api/api';
import {User} from '../user/user';


@Injectable()
export class Events {

    calendarEventsAsClient = {} as CalendarEventsAsClient;


    constructor(public api: Api) {
    }


    public LoadCalenderEvents() {
        this.getBookedOffersAsClient();
        this.getWorkOffersAwaitingServiceProviderAsClient();
        this.getWorkOffersAwaitingApprovalAsClient();
        this.GetWorkOfferHistoryAsClient();
    }

    private getBookedOffersAsClient() {
        const endpoint = 'work-offers/client/booked';
        const seq = this.api.get(endpoint, null, this.api.getAuthHeader()).subscribe((res: any) => {
            this.calendarEventsAsClient.bookedWorkOffersAsClient = res.data.items;
        });
    }

    private getWorkOffersAwaitingServiceProviderAsClient() {
        const endpoint = 'work-offers/client/awaiting-service-provider';
        const seq = this.api.get(endpoint, null, this.api.getAuthHeader()).subscribe((res: any) => {
            this.calendarEventsAsClient.WorkOffersAwaitingServiceProviderAsClient= res.data.items;
        });
    }

    private getWorkOffersAwaitingApprovalAsClient() {
        const endpoint = 'work-offers/client/awaiting-approval';
        const seq = this.api.get(endpoint, null, this.api.getAuthHeader()).subscribe((res: any) => {
            this.calendarEventsAsClient.WorkOffersAwaitingApprovalAsClient = res.data.items;
        });
    }

    private GetWorkOfferHistoryAsClient() {
        const endpoint = 'work-offers/client/history';
        const seq = this.api.get(endpoint, null, this.api.getAuthHeader()).subscribe((res: any) => {
            this.calendarEventsAsClient.WorkOfferHistoryAsClient = res.data.items;
        });

    }
}

 export interface CalendarEventsAsClient {
     bookedWorkOffersAsClient: Array <BookedOffersAsClient>;
     WorkOffersAwaitingServiceProviderAsClient: Array <WorkOffersAwaitingServiceProviderAsClient>;
     WorkOffersAwaitingApprovalAsClient: Array <WorkOffersAwaitingApprovalAsClient>;
     WorkOfferHistoryAsClient: Array <WorkOfferHistoryAsClient>;
 }

  export  interface BookedOffersAsClient {
        'id': number;
        'idServiceProvider': number;
        'serviceProviderName': string;
        'title': string;
        'careType': string;
        'wage': number;
        'total': number;
        'startTimeUTC': string;
        'endTimeUTC': string;
        'startTimeLocal': string;
        'endTimeLocal': string;
        'timeZone': string;
        'postalCode': string;
        'isContinuous': boolean;
        'allowCancellation': boolean;
    }

   export interface WorkOffersAwaitingServiceProviderAsClient {
        'id': number;
        'title': string;
        'careType': string;
        'wage': number;
        'total': number;
        'startTimeUTC': string;
        'endTimeUTC': string;
        'startTimeLocal': string;
        'endTimeLocal': string;
        'timeZone': string;
        'postalCode': string;
        'isContinuous': boolean;
    }

    export interface WorkOffersAwaitingApprovalAsClient {
        'id': number;
        'idWorkMessage': number;
        'idServiceProvider': number;
        'serviceProviderName': string;
        'title': string;
        'careType': string;
        'wage': number;
        'total': number;
        'startTimeUTC': string;
        'endTimeUTC': string;
        'startTimeLocal': string;
        'endTimeLocal': string;
        'timeZone': string;
        'postalCode': string;
        'isContinuous': boolean;
    }

   export interface WorkOfferHistoryAsClient {
        'id': number;
        'idServiceProvider': number;
        'serviceProviderName': string;
        'title': string;
        'careType': string;
        'wage': number;
        'startTimeUTC': string;
        'endTimeUTC': string;
        'startTimeLocal': string;
        'endTimeLocal': string;
        'timeZone': string;
        'postalCode': string;
        'isContinuous': boolean;
        'allowCancellation': boolean;
        'amountPaid': number;
        'type': string;
    }


    /*this is more about details then events*/
    interface Shifts {
        'id': number;
        'idWorkOffer': number;
        'clockInTimeUTC': string;
        'clockOutTimeUTC': string;
        'totalTime': number;
        'isClockedIn': boolean;
        'startTimeLocal': string;
        'endTimeLocal': string;
        'startTimeUTC': string;
        'endTimeUTC': string;
        'pay': string;
        'isComplete': boolean;
    }
