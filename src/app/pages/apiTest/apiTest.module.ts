import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';

import {ApiTestPage} from './api-test-page.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: ApiTestPage
            }
        ])
    ],
    declarations: [ApiTestPage]
})

export class ApiTestModule {
}

