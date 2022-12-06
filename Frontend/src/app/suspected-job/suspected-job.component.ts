import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suspected-job',
  templateUrl: './suspected-job.component.html',
  styleUrls: ['./suspected-job.component.css']
})
export class SuspectedJobComponent implements OnInit {

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
