import {Injectable} from '@angular/core';
import {Api} from '../api/api';
import {Router} from '@angular/router';
import {Utils} from '../utils/utils';
import {MockData} from '../mockData/mockData';

@Injectable()
export class Msgs {

    threadsList: Array<Threads> = [];
    messagesList: Array<Messages> = [];
    threadsIcons: Array<String> = [];
    hideBackBtn = true;

    constructor(public api: Api, public router: Router, public utils: Utils, public mockData: MockData) {
    }

    getThreads() {
        const endpoint = 'threads';
        this.api.get(endpoint, null, this.api.getAuthHeader()).subscribe((res: any) => {
            this.threadsList = res.data.items;
            this.threadsList.sort((a, b) => b.lastUpdatedUTC.localeCompare(a.lastUpdatedUTC));
            this.loadIconsForThreads();
            console.log(this.threadsList);
        });
    }

    getThreadMessages(id: number) {
        const endpoint = 'threads/' + id;
        let seq = this.api.get(endpoint, null, this.api.getAuthHeader()).subscribe((res: any) => {
            this.messagesList = res.data.items;
            this.messagesList.sort((a, b) => a.createdDateUTC.localeCompare(b.createdDateUTC));
            console.log(this.messagesList);
            this.loadIconsForMsg();
        });
    }

    launchMessages(index: number) {
        this.getThreadMessages(this.threadsList[index].id);
        // might want to set user from here (fromId)
        this.router.navigateByUrl('tabs/messaging');
        this.hideBackBtn = false;
    }

    clearMessages() {
        this.messagesList = [];
        this.hideBackBtn = true;
        // might want to clear user from here (fromId)
    }

    clearTheads() {
        this.threadsList = [];
        this.threadsIcons = [];
    }

    private loadIconsForThreads() {
        for (let i = 0; i < this.threadsList.length; i++) {
                if (this.threadsIcons[this.threadsList[i].idFrom] === undefined) {
                this.utils.getProfile(this.threadsList[i].idFrom.toString()).subscribe((res: any) => {
                    this.threadsIcons[this.threadsList[i].idFrom] = res.data.profilePicture;

                });
            }
        }
    }

    private loadIconsForMsg() {
        for (let i = 0; i < this.messagesList.length; i++) {
            if (this.threadsIcons[this.messagesList[i].idFrom] === undefined) {
              this.utils.getProfile(this.messagesList[i].idFrom.toString()).subscribe((res: any) => {
                    this.threadsIcons[this.messagesList[i].idFrom] = res.data.profilePicture;
                });
            }
        }
    }
}

 export interface Threads {
     'id': number;
     'idFrom': number;
     'idTo': number;
     'nameFrom': string;
     'nameTo': string;
     'lastMessage': string;
     'lastUpdatedUTC': string;
}

export interface Messages {
    'id': number;
    'idFrom': number;
    'idTo': number;
    'nameFrom': string;
    'nameTo': string;
    'text': string;
    'createdDateUTC': string;
}

