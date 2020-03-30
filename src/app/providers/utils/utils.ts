import {Injectable} from '@angular/core';
import {AlertController, PopoverController, ToastController} from '@ionic/angular';
import {Api} from '../api/api';
import {MockData} from '../mockData/mockData';


@Injectable()
export class Utils {

    hidePopover = true;

    constructor(public toastCtrl: ToastController,
                public api: Api,
                public alertController: AlertController,
                public popoverController: PopoverController,
                public mockData: MockData) {
    }
    popoverArray: any = {};

    formatDate(date: string) {
        const threadDate = new Date(date + ' UTC');
        const timeNow = Date.now();
        const received = (((timeNow - threadDate.getTime()) / 1000)) / 60;

        let duration = '';
        if (received < 1) {
            duration = 'a minute ago';
        } else if (received > 1 && received < 60) {
            duration = Math.round(Math.abs(received)) + ' minutes ago';
        } else if (received > 60 && received < 1440) {
            duration = Math.round(Math.abs(received / 60)) + ' hours ago';
        } else {
            duration = Math.round(Math.abs((received / 60) / 24)) + ' days ago';
        }
        return duration;
    }

    // display message on screen
    async toast(message: string) {
        const toast = await this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }

    // convert json to form data for posting
    // currently not needed due to ionic proxy
    // however in the future it might be needed at production time
    jsonToFormData(json: any) {
        const formData = new FormData();
        for (const key in json) {
            formData.append(key, json[key]);
        }
        return formData;
    }

    // attempt to parse http error response for development debugging only
    parseError(err: any) {
        try {
            console.log(JSON.stringify(err));
            console.log(err.error.error.message);
           // this.toast(JSON.stringify(err.error.error.code + ': ' + err.error.error.message));

        } catch (e) {
            console.log(e);
        }
    }

    parseRes(res: any) {
        console.log(JSON.stringify(res));
    }

    /**
     * check if a phone numeber exists (res = exist, err = not exist)
     * upto the caller to subscribe to and handle the event
     */
    checkPhoneNumber(phoneNumber: string) {
        const endpoint = 'users/phone/' + phoneNumber;
        const seq = this.api.head(endpoint);
        return seq;
    }

    /**
     * check if a email exists (res = exist, err = not exist)
     * upto the caller to subscribe to and handle the event
     */
    checkEmail(email: string) {
        const endpoint = 'users/email/' + email;
        const seq = this.api.head(endpoint);
        return seq;
    }

    async presentAlert(message: string) {
        const alert = await this.alertController.create({
            message: message,
            buttons: ['OK']
        });

        await alert.present();
    }

    async presentPopover(event: any, component: any, cssClass: any) {
        this.hidePopover = false;
           this.popoverArray[component] = await this.popoverController.create({
            cssClass,
            component,
            event,
            translucent: true,
        });
        return await this.popoverArray[component].present();
    }

    dismissPopover(component: any) {
        this.popoverArray[component].dismiss();
        this.hidePopover = true;
    }

    getRating(rating) {
        return new Array(rating);
    }
    Arr(elements) {
        return new Array(elements);
    }

    /**
     * Send a request to get  user profile.
     * upto the caller to subscirbe to the responce and handle it
     */
    getProfile(id: string) {
            const endpoint = 'users/' + id;
            const seq = this.api.get(endpoint, null, this.api.getAuthHeader());
            return seq;
    }
}


