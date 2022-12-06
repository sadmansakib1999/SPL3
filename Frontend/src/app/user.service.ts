import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User = {
    email: '',
    password: '',
    profile: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  /*setResponse(userId: string, email: string){
    this.response.userId = userId;
    this.response.email = email;
  }*/

  //HttpMethods

  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'authenticate/signup/', user);
  }

  login(authCredentials: any) {
    return this.http.post(environment.apiBaseUrl + 'authenticate/signin/', authCredentials);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }

  recognize(username: any) {
    console.log("called")
    return this.http.post(environment.apiBaseUrl+'api/recognize/', username);
  }


  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
