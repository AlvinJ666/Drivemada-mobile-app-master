import {Component} from '@angular/core';
import {Msgs, User} from '../../providers';
import {Router} from '@angular/router';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})


export class TabsPage {

    constructor(public user: User, public msgs: Msgs, public router: Router) {

    }
}


