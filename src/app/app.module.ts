import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ComponentsModule} from './components/components.module';
// import {ErrorInterceptor} from './interceptors/error-interceptor';
import { SurvivorAppRootComponent } from './components/app-root/app-root.component';
import {AppRoutingModule} from './routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    ComponentsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [
    // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [SurvivorAppRootComponent]
})
export class AppModule { }
