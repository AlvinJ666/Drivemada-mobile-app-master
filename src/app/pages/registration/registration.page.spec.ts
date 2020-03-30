import {RegistrationPage} from './registration.page';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {BrowserModule, By} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule, IonIcon, IonicRouteStrategy, Platform} from '@ionic/angular';
import {IonicGlobal, IonicWindow} from '@ionic/angular/dist/types/interfaces';
import {IonicNativePlugin} from '@ionic-native/core';

import {TranslateModule} from '@ngx-translate/core';
import {Api, User, Settings} from '../../providers';
import {HttpClient, HttpHandler} from '@angular/common/http';




describe('Registration: ', () => {
    let register: RegistrationPage;
    let fixture: ComponentFixture<RegistrationPage>;
    let htmlElement: HTMLElement;

    beforeEach(async(()=>{
        TestBed.configureTestingModule({
            declarations:[
                //{ provide: Platform, useClass: RegistrationPage },
                RegistrationPage,
            ],
            imports:[
                BrowserModule,
                FormsModule,
                ReactiveFormsModule,
                IonicModule,

                TranslateModule
            ],
            providers: [
                User,
                Api,
                HttpClient,
                HttpHandler,
                Settings]
        }).compileComponents().then(()=>{
            fixture = TestBed.createComponent(RegistrationPage);
            register = fixture.componentInstance;
            htmlElement = fixture.debugElement.query(By.css('form')).nativeElement;
        });
    }));

    it('should set submitted to true', async()=>{
        fixture.detectChanges();
        spyOn(register,'doSignup');
        htmlElement = fixture.debugElement.query(By.css('ion-button')).nativeElement;
        htmlElement.click();
        expect(register.doSignup).toHaveBeenCalledTimes(0);
    });
});
