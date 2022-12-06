import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user.model';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  selectedUser = new User();
  response = {
    userId: '',
    email: ''
  }
  serverErrorMessages: string = "";


  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  signUp(){
    this.userService.postUser(this.selectedUser).subscribe(
      (res:any) => {
        this.response = res['data'];
        this.router.navigateByUrl('signin');
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

  uploadFile(event:any) {
    this.selectedUser.profile = event.target.files[0];
  }

  hasAccount(){
    this.router.navigateByUrl('signin');
  }

}
