import { Component, OnInit, OnDestroy } from '@angular/core';


declare function startTrack(time_limit: number): any;
declare function suspectedStatus(): any;
declare function stopWebGazer(): any;

@Component({
  selector: 'app-eye-ball',
  templateUrl: './eye-ball.component.html',
  styleUrls: ['./eye-ball.component.css']
})
export class EyeBallComponent implements OnInit, OnDestroy  {

  constructor() { }

  ngOnInit(): void {
    console.log("YESSS");
    startTrack(1000);
  }

  intervalID: any = setInterval(() => {
    if (suspectedStatus() != 0) {
      // TODO: logout
    }
  }, 1000);

  ngOnDestroy(){
    stopWebGazer();
  }

}
