import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { OutputPageComponent } from './outputPage/output-page/output-page.component';
import { SubscriptionPageComponent } from './subscriptionPage/subscription-page/subscription-page.component';
import { HomePageComponent } from './homePage/home-page/home-page.component';
import { InputPageComponent } from './inputPage/input-page/input-page.component';
import { LoginPageComponent } from './authenticationPages/login-page/login-page.component';
import { SignupPageComponent } from './authenticationPages/signup-page/signup-page.component';
import { NavbarComponent } from './globalComponent/navbar/navbar.component';
import { FooterComponent } from './globalComponent/footer/footer.component';
import { InputBoxComponent } from './inputPage/input-box/input-box.component';
import 'bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoleculeInfoComponent } from './outputPage/molecule-info/molecule-info.component';
import { ResultCardComponent } from './outputPage/result-card/result-card.component';
import { MoleculeDrawComponent } from './outputPage/molecule-draw/molecule-draw.component';
import { ProfilePageComponent } from './profilePages/profile-page/profile-page.component';
import { ProfileEditComponent } from './profilePages/profile-edit/profile-edit.component';
import { ProfileInfoCardComponent } from './profilePages/profile-info-card/profile-info-card.component';
import { RequestHistoryComponent } from './profilePages/request-history/request-history.component';
import { RequestStatusComponent } from './profilePages/request-status/request-status.component';
import { ContactComponent } from './globalComponent/contact/contact.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgApexchartsModule } from "ng-apexcharts";
import { OurServicesComponent } from './homePage/our-services/our-services.component';
import { AboutusComponent } from './homePage/aboutus/aboutus.component';


const appRoutes: Routes = [
  { path: 'profile', component: ProfilePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'input', component: InputPageComponent },
  { path: 'output', component: OutputPageComponent },
  { path: 'profile/edit', component: ProfileEditComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'subscription', component: SubscriptionPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    OutputPageComponent,
    SubscriptionPageComponent,
    HomePageComponent,
    LoginPageComponent,
    InputPageComponent,
    LoginPageComponent,
    SignupPageComponent,
    NavbarComponent,
    FooterComponent,
    InputBoxComponent,
    MoleculeInfoComponent,
    ResultCardComponent,
    MoleculeDrawComponent,
    ProfilePageComponent,
    ProfileEditComponent,
    ProfileInfoCardComponent,
    RequestHistoryComponent,
    RequestStatusComponent,
    ContactComponent,
    OurServicesComponent,
    AboutusComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgApexchartsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
