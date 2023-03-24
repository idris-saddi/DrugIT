import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { OutputPageComponent } from './outputPage/output-page/output-page.component';
import { SubscriptionPageComponent } from './subscriptionPage/subscription-page/subscription-page.component';
import { HomePageComponent } from './homePage/home-page/home-page.component';
import { WaitingPageComponent } from './waitingPage/waiting-page/waiting-page.component';
import { InputPageComponent } from './inputPage/input-page/input-page.component';
import { LoginPageComponent } from './authenticationPages/login-page/login-page.component';
import { SignupPageComponent } from './authenticationPages/signup-page/signup-page.component';
import { NavbarComponent } from './globalComponent/navbar/navbar.component';
import { FooterComponent } from './globalComponent/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    OutputPageComponent,
    SubscriptionPageComponent,
    HomePageComponent,
    WaitingPageComponent,
    InputPageComponent,
    LoginPageComponent,
    SignupPageComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
