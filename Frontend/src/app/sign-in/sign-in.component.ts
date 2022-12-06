import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private router : Router, private userService : UserService, private authService: AuthService) { }

  selectedUser = new User();
  response = {
    userId: '',
    email: ''
  }
  serverErrorMessages: string = "";

  ngOnInit(): void {
  }

  signIn() {

    this.userService.login(this.selectedUser).subscribe(
      (res:any) => {
        this.authService.setuser(this.selectedUser.email);
        console.log("done", this.authService.getuser());
        this.response = res['data'];
        this.router.navigateByUrl('examtab');
      },
      err => {
        if(err.status == 422){
          this.serverErrorMessages = err.error.join('<br>');
        }
        else{
          this.serverErrorMessages = "Something went wrong";
        }
      }
    )
  }

  hasNotAccount() {
    this.router.navigateByUrl('signup');
  }

}
