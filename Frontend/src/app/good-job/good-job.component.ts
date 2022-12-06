import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-good-job',
  templateUrl: './good-job.component.html',
  styleUrls: ['./good-job.component.css']
})
export class GoodJobComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  signIn(){
    this.router.navigate(['signin']);
  }

  signUp() {
    this.router.navigate(['signup']);
  }

}
