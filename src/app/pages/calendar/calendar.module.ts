import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {CalendarPage} from './calendar.page';

// @ts-ignore
import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
    imports: [
        CommonModule,
        NgCalendarModule,
        FormsModule,
        IonicModule,
        TranslateModule.forChild(),
        RouterModule.forChild([
            {
                path: '',
                component: CalendarPage
            }
        ])
    ],
    declarations: [CalendarPage]
})
export class CalendarPageModule {
}
