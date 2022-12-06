import { Injectable } from '@angular/core';
import { Auth } from './auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: Auth = {
    email: '',
  };
  constructor() { }
  setuser(email:any) {
    this.auth.email = email;
  }
  getuser() {
    return this.auth.email;
  }
}
