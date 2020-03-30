import {Component} from '@angular/core';

import {Config, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';
import {Settings, User} from './providers';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public appPages = [
        {
            title: 'Dashboard',
            url: '/tabs/dashboard',
            icon: 'person'
        },
        {
            title: 'Calendar',
            url: '/tabs/calendar',
            icon: 'calendar'
        },
        {
            title: 'Inbox',
            url: '/tabs/inbox',
            icon: 'mail'
        },
        {
            title: 'Search',
            url: '/tabs/search',
            icon: 'search'
        },
        {
            title: 'Add',
            url: '/tabs/add',
            icon: 'add'
        },
        {
            title: 'Profile',
            url: '/profile',
            icon: 'person'
        },
        {
            title: 'Settings',
            url: '/settings',
            icon: 'settings'
        },
        {
            title: 'Payment',
            url: '/tabs/payment',
            icon: 'payment'
        },
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private router: Router,
        private translate: TranslateService,
        private settings: Settings,
        private config: Config,
        private user: User,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.loadData();
            this.initTranslate();
        });
    }

    loadData() {
        // loading local storage to see if user has saved account details
        this.settings.load().then(() => {
            // we first try to get the saved email
            this.settings.getValue('email').then((val) => {
                if (val != null) {
                    // got an email lets save it
                    this.user.loginCredentials.email = val;
                    // now we try to get the password
                    this.settings.getValue('password').then((valPassword) => {
                        if (valPassword != null) {
                            // got password lets save it
                            this.user.loginCredentials.password = valPassword;
                            // now we can try to login using the stored credentials
                            this.user.login(null).subscribe((resp) => {
                                // login successful goto dashboard
                                    this.router.navigateByUrl('tabs/dashboard');
                            }, (err) => {
                                // Unable to log in with stored information redirect to login page
                                this.setRootPage('login');
                            });
                        } else { // have email but no password
                            // so we will set password field empty
                            this.user.loginCredentials.password = '';
                            // now we can goto the login page for them to type the password
                            this.setRootPage('login');
                        }
                    });
                } else { // no user name or password saved
                    // we will goto the welcome page so they can choose to login or register
                    this.setRootPage('welcome');
                }
            });
        });
    }

    initTranslate() {
        // Set the default language for translation strings, and the current language.
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();

        if (browserLang) {
            if (browserLang === 'zh') {
                const browserCultureLang = this.translate.getBrowserCultureLang();

                if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
                    this.translate.use('zh-cmn-Hans');
                } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
                    this.translate.use('zh-cmn-Hant');
                }
            } else {
                this.translate.use(this.translate.getBrowserLang());
            }
        } else {
            this.translate.use('en'); // Set your language here
        }
        // commented out because i dont know what parameters config.set takes RV
        // this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
        // this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
        // });
    }

    setRootPage(page: any) {
        this.router.navigateByUrl(page);
        this.splashScreen.hide();
    }
    Logout() {
        this.user.logout();
        this.router.navigateByUrl('welcome');
    }


}