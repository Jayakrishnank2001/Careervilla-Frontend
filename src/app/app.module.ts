import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { SubscriptionPlanService } from './services/subscription-plan.service';
import { LocationService } from './services/location.service';
import { JobService } from './services/job.service';
import { ReportedJobService } from './services/reported-job.service';
import { CompanyService } from './services/company.service';
import { IndustryService } from './services/industry.service';
import { WebSocketService } from './services/web-socket.service';
import { MessageService } from './services/message.service';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
    SubscriptionPlanService,
    BreakpointObserver,
    LocationService,
    CompanyService,
    JobService,
    ReportedJobService,
    IndustryService,
    WebSocketService,
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
