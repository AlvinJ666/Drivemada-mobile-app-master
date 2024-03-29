import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {ForgotPasswordComponent} from './forgot-password.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TranslateModule.forChild(),
        RouterModule.forChild([
            {
                path: '',
                component: ForgotPasswordComponent
            }
        ])
    ],
    declarations: [ForgotPasswordComponent]
})
export class ForgotPasswordComponentModule {
}
