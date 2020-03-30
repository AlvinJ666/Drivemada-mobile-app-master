import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {Api, User} from '../../providers';


@Component({
    selector: 'page-settings',
    templateUrl: 'settings.page.html'
})
export class SettingsPage {

    constructor(
        public translate: TranslateService,
        public router: Router,
        public user: User,
        public api: Api) {
    }

    Logout() {
        this.user.logout();
        this.router.navigateByUrl('welcome');
    }

    ApiTests() {
        this.router.navigateByUrl('apiTest');
    }
}
