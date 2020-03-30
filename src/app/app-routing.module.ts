import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'tabs',
        pathMatch: 'full'
    },
    {
        path: 'welcome',
        loadChildren: 'src/app/pages/welcome/welcome.module#WelcomePageModule'
    },
    {
        path: 'login',
        loadChildren: 'src/app/pages/login/login.module#LoginPageModule'
    },
    {
        path: 'registration',
        loadChildren: 'src/app/pages/registration/registration.module#RegistrationPageModule'
    },
    {
        path: 'tabs',
        loadChildren: 'src/app/pages/tabs/tabs.module#TabsPageModule'
    },
    {
        path: 'settings',
        loadChildren: 'src/app/pages/settings/settings.module#SettingsPageModule'
    },
    {
        path: 'apiTest',
        loadChildren: 'src/app/pages/apiTest/apiTest.module#ApiTestModule'
    },
    {
        path: 'profile',
        loadChildren: './pages/profile/profile.module#ProfilePageModule'
    },


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
