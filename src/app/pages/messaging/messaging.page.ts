import {Component} from '@angular/core';
import {Msgs} from '../../providers/msgs/msgs';
import {User, Utils} from '../../providers';
import {Router} from '@angular/router';


/**
 * Generated class for the MessagingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
    selector: 'page-messaging',
    templateUrl: 'messaging.page.html',
    styleUrls: ['messaging.page.scss'],
})
export class MessagingPage {

    constructor(public msgs: Msgs, public utils: Utils, public user: User, public router: Router) {
    }

    ionViewWillEnter() {

    }

    ionViewDidLoad(){
        document.querySelector('#showMe').scrollIntoView();

    }

    ionViewWillLeave() {
        this.msgs.clearMessages();
    }


    formatDate(date: string){
        let threadDate=new Date(date+" PDT");
        let timeNow = Date.now();
        let received = (((timeNow - threadDate.getTime())/1000))/60;

        let duration="";
        if (received<1){
            duration = "a minute ago";
        }
        else if (received >1 && received < 60){
            duration= Math.round(Math.abs(received)) + " minutes ago";
        }
        else if (received >60 && received < 1440){
            duration = Math.round(Math.abs(received/60)) + " hours ago";
        }
        else {
            duration = Math.round(Math.abs((received/60)/24)) + " days ago";
        }
        return duration;
    }

    backToInbox() {
        this.router.navigateByUrl('tabs/inbox');
    }
}
