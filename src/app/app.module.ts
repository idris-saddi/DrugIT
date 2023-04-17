import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
