import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { EmailCustomVaidation } from './template-driven/email-validator.directive';
import { TempalteDrivenComponent } from './template-driven/tempalte-driven.component';
import { ReactiveComponent } from './reactive/reactive.component';
import { ConfirmPasswordDirective } from './template-driven/confirm-password.directive';
import { UsernameValidatiorDirective } from './template-driven/username-validatior.directive';

@NgModule({
  declarations: [
    AppComponent,
    TempalteDrivenComponent,
    ReactiveComponent,
    EmailCustomVaidation,
    ConfirmPasswordDirective,
    UsernameValidatiorDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
