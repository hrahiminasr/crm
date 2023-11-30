import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Error state matcher
import { ErrorStateMatcher } from '@angular/material/core';
import { DefaultErrorStateMatcher } from './default-error-state.matcher';

import { MaterialModule } from './modules/material.module';
import { ComponentModule } from './modules/component.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    ComponentModule,
    MaterialModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor,multi: true},
    { provide: ErrorStateMatcher, useClass: DefaultErrorStateMatcher }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
