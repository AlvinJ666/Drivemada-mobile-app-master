import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [

    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: '',
                redirectTo: 'tabs/dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadChildren: 'src/app/pages/dashboard/dashboard.module#DashboardPageModule'
            },
            {
                path: 'calendar',
                loadChildren: 'src/app/pages/calendar/calendar.module#CalendarPageModule'
            },
            {
                path: 'inbox',
                loadChildren: 'src/app/pages/inbox/inbox.module#InboxPageModule'
            },
            {
                path: 'messaging',
                loadChildren: 'src/app/pages/messaging/messaging.module#MessagingPageModule'
            },

            {
                path: 'search',
                loadChildren: 'src/app/pages/search/search.module#SearchPageModule'
            },
            {
                path: 'add',
                loadChildren: 'src/app/pages/add/add.module#AddPageModule'
            },
            {
                path: 'payment',
                loadChildren: 'src/app/pages/payment/payment.module#PaymentPageModule'
            },
        ]
    }
];


@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
