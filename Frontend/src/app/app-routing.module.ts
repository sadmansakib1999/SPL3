import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ExamTabComponent } from './exam-tab/exam-tab.component';
import { EyeBallComponent } from './eye-ball/eye-ball.component';
import { FaceRecognationComponent } from './face-recognation/face-recognation.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuspectedJobComponent } from './suspected-job/suspected-job.component';
import { GoodJobComponent } from './good-job/good-job.component';

const routes: Routes = [
  { path: '', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'examtab', component: ExamTabComponent },
  { path: 'eyeball', component: EyeBallComponent },
  { path: 'facerec', component: FaceRecognationComponent },
  { path: 'good', component: GoodJobComponent },
  { path: 'suspected', component: SuspectedJobComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
