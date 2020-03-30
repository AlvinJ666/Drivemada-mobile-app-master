import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MockData} from '../mockData/mockData';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
    /*** this url should be used when testing apps ***/
   // url = ' https://ambitiously-aurochs-microfarad.herokuapp.com';
    /*** this url should be used in production ***/
    url: string = 'https://api.caremada.com';
    /*** this url should be used to prevent cors / 405 errors in development ***/
    // url = '/api';
    /*** this url should be used when running api locally  ***/
     //url: string = 'http://localhost:3001';

    useMockData = true;

    private _auth: string; // stores user auth token

    constructor(public http: HttpClient) {
    }

    getAuthHeader() {
        return {headers: new HttpHeaders().set('Authorization', 'Bearer ' + this._auth)};
    }
    setAuthToken(token: string) {
        this._auth = token;
    }

    get(endpoint: string, params?: any, reqOpts?: any) {

        if (!reqOpts) {
            reqOpts = {
                params: new HttpParams()
            };
        }

        // Support easy query params for GET requests
        if (params) {
            reqOpts.params = new HttpParams();
            for (const k in params) {
                reqOpts.params = reqOpts.params.set(k, params[k]);
            }
        }

        let seq = this.http.get(this.url + '/' + endpoint, reqOpts);

        if (this.useMockData) {
            seq =  MockData.mockApiGet(endpoint, seq);
        }

        return seq;

    }

    post(endpoint: string, body: any, reqOpts?: any) {

        let seq = this.http.post(this.url + '/' + endpoint, body, reqOpts);

        if (this.useMockData) {
            seq =  MockData.mockApiPost(endpoint, seq);
        }

        return seq;
    }

    put(endpoint: string, body: any, reqOpts?: any) {
        return this.http.put(this.url + '/' + endpoint, body, reqOpts);
    }

    delete(endpoint: string, reqOpts?: any) {
        return this.http.delete(this.url + '/' + endpoint, reqOpts);
    }

    patch(endpoint: string, body: any, reqOpts?: any) {
        return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
    }

    head(endpoint: string, reqOpts?: any) {
        return this.http.head(this.url + '/' + endpoint, reqOpts);
    }
}

