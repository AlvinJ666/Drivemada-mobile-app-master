import {Component} from '@angular/core';
import {Router} from '@angular/router';


@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.page.html',
    styleUrls: ['welcome.page.scss', '../../../theme/launch.scss']
})
export class WelcomePage {

    constructor(public router: Router) {
    }

    login() {
        this.router.navigateByUrl('login');
    }

    signup() {
        this.router.navigateByUrl('registration');
    }

    logo() {
        return ;
    }

    logoText() {
        return 'CAREMADA';
    }
}
