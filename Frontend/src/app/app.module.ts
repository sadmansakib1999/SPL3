import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebcamModule } from 'ngx-webcam';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FaceRecognationComponent } from './face-recognation/face-recognation.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { EyeBallComponent } from './eye-ball/eye-ball.component';
import { ExamTabComponent } from './exam-tab/exam-tab.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GoodJobComponent } from './good-job/good-job.component';
import { SuspectedJobComponent } from './suspected-job/suspected-job.component';

@NgModule({
  declarations: [
    AppComponent,
    FaceRecognationComponent,
    NavBarComponent,
    SignUpComponent,
    SignInComponent,
    EyeBallComponent,
    ExamTabComponent,
    GoodJobComponent,
    SuspectedJobComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebcamModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
