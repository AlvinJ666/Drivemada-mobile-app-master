import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {RegistrationPage} from './registration.page';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        TranslateModule.forChild(),
        RouterModule.forChild([
            {
                path: '',
                component: RegistrationPage
            }
        ])
    ],
    declarations: [RegistrationPage]
})
export class RegistrationPageModule {
}
