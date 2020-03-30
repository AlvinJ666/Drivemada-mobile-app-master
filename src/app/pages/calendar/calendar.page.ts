import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import * as moment from 'moment';
import {Events} from '../../providers';

/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
    selector: 'page-calendar',
    templateUrl: 'calendar.page.html',
    styleUrls: ['calendar.page.scss'],
})
export class CalendarPage  implements OnInit {

  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  constructor(public events: Events, private modalCtrl: ModalController) { }

  ngOnInit() {
    }

    // this occors when ever you goto the calander page
    ionViewWillEnter() {
        this.loadEvents();

    }

    // this occors whenever you leave the calander page
    ionViewWillLeave() {
        // good palce to stop thread interval refresh
    }

    loadEvents() {
      this.loadArrayEvents(this.events.calendarEventsAsClient.WorkOffersAwaitingServiceProviderAsClient, 'red');
      this.loadArrayEvents(this.events.calendarEventsAsClient.WorkOffersAwaitingApprovalAsClient, 'green');
      this.loadArrayEvents(this.events.calendarEventsAsClient.bookedWorkOffersAsClient, 'pink');
      this.loadArrayEvents(this.events.calendarEventsAsClient.WorkOfferHistoryAsClient, 'yellow');
      this.refreshCalender();

    }

    loadArrayEvents(array: any, color: string) {
        array.forEach( (element, key) => {
            this.addEvent(key, new Date(element.startTimeLocal), new Date(element.endTimeLocal), element.title, color);
        });

    }

    mode(name: string){
    this.calendar.mode = name;
    }

    addEvent(id: number, startTime: Date, endTime: Date, title: string, eventColor: string)     {
        this.eventSource.push({id, startTime, endTime, title, eventColor});
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    const start = moment(event.startTime).format('LLLL');
    const end = moment(event.endTime).format('LLLL');
    console.log(JSON.stringify(event));
    // we shoulddisplay more details here (maybe a popover?)
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

    private refreshCalender() {
        const events = this.eventSource;
        this.eventSource = [];
        setTimeout(() => {
            this.eventSource = events;
        });
    }
}

/*
     this.loadNewCalendarEvents();
    }
    loadedCalendarEventsAsClient = {} as CalendarEventsAsClient;

    // this will compare the local calander events(added) with the providers events
    // and remove or add new events recived from the api as aproprate
    updateCalender() {
      this.deleteRemovedEvents();
      this.loadNewCalendarEvents();
    }

    // this will check if any events currently in the calander do not match the api list and remove them
    deleteRemovedEvents() {
      this.loadedCalendarEventsAsClient.WorkOffersAwaitingServiceProviderAsClient.forEach((loadedElement, key) => {
            let match = false;
            this.events.calendarEventsAsClient.WorkOffersAwaitingServiceProviderAsClient.forEach( (apiElement, key) => {
                if (loadedElement.id == apiElement.id){
                    match = true;
                    }
                });
                if (!match) {
                    this.loadedCalendarEventsAsClient.WorkOffersAwaitingServiceProviderAsClient.splice(key,1);
                }

            });
        }



    // this will check if any events in the api list do not match those in the calander and add them to the calander
    loadNewCalendarEvents(loadedArray: any, apiArray: any){

        loadedArray.forEach((loadedElement, key) => {
            let match = false;
            apiArray.forEach( (apiElement, key) => {
                if (loadedElement.id == apiElement.id){
                    match = true;
                }
            });
            if (!match) {
                this.loadedCalendarEventsAsClient.WorkOffersAwaitingServiceProviderAsClient.splice(key,1);
            }

        });
 */
