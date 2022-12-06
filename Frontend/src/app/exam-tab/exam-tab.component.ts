import { HostListener, Component, OnInit, OnDestroy } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ok } from 'assert';
import { delay } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';



declare const isScreenWidthHeightOK: any;
declare const startTrack: any;
declare const suspectedStatus: any;
declare const stopWebGazer: any;

@Component({
  selector: 'app-exam-tab',
  templateUrl: './exam-tab.component.html',
  styleUrls: ['./exam-tab.component.css']
})
export class ExamTabComponent implements OnInit {

  private trigger: Subject<any> = new Subject();
  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();
  sysImage = '';

  constructor(private router : Router, private userService: UserService, private authService: AuthService) { }

  serverErrorMessages: string = "";
  messagestring: string = "";
  tabsize: string = "";
  response: any;
  selectedUser = new User();
  countTab = 0;
  countEye = 0;
  countFace = 0;

  ngOnInit(): void {
    this.check();
  }

  @HostListener('window:focus', ['$event'])
    onFocus(event:any) {
      this.tabsize = "";
  }

  @HostListener('window:blur', ['$event'])
    onBlur(event:any) {
    this.tabsize = "Tab change Warnning";
    this.countTab += 1;
    if (this.countTab >= 3) this.log = true;
  }

  scrHeight:any;
  scrWidth:any;

  @HostListener('window:resize', ['$event'])
    getScreenSize(event:any) {
      this.scrHeight = window.innerHeight;
      this.scrWidth = window.innerWidth;
      if (!isScreenWidthHeightOK()) {
        this.tabsize = "Tab minimization Warnning";
        this.countTab += 1;
        if (this.countTab >= 3) this.log = true;
      }
      else {
        this.tabsize = "";
      }
  }

 faceRec() {
  this.selectedUser.email = this.authService.getuser();
  this.userService.recognize(this.selectedUser).subscribe(
      (res:any) => {
        this.response = res;
        this.messagestring = res;
        if (res != "User face verified") this.countFace += 1;
        if (this.countFace >= 2) this.log = true;
        console.log(this.response)
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

 flag: boolean = false;

 intervalID1: any = setInterval(() => {
    if (!this.flag) this.faceRec();
  }, 5000);

  eyeballDetectionStart() {
    this.flag = true;
    startTrack();
  }

  intervalID2: any = setInterval(() => {
    if (suspectedStatus() != 0) {
      this.serverErrorMessages = "Illigal activity detected";
      this.countEye += 1;
    if (this.countEye >= 5) this.log = true;
    }
    else {
      this.serverErrorMessages = "";
    }
  }, 1000);

  log: boolean = false;
  intervalID3: any = setInterval(() => {
    if (this.log) {
      this.router.navigate(['signin']);
    }
  }, 1000);


  logout() {
    this.log = true;    
  }

  check() {
    if (!isScreenWidthHeightOK()) {
      this.logout();
    }
  }

  submit() {
    this.logout();
  }

  ngOnDestroy(){
    stopWebGazer();
  }

  public getSnapshot(): void {
    this.trigger.next(void 0);
  }

  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsDataUrl;
    console.info('got webcam image', this.sysImage);
    console.log(webcamImage);
  }

  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

}
