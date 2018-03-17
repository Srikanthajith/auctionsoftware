import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class LoginserviceService {

private getProjectDetails = 'api/projectdetails/';

constructor(private http: Http) { }

userLogin(login) {
    const headers = new Headers();
    const postUrl = '/api/login';
    headers.append('Content-Type', 'application/json');
    console.log(login);
    return this.http.post(postUrl, JSON.stringify(login), {headers: headers})
    .map(res => res.json());
}


storeUserData(token) {
    localStorage.setItem('token', token);
}

getData(first: number, rows: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.getProjectDetails + first + '/' + rows, { headers: headers })
      .map(res => res.json());
}


}


