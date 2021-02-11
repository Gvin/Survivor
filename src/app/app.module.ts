import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ComponentsModule} from './components/components.module';
import { SurvivorAppRootComponent } from './components/app-root/app-root.component';
import {AppRoutingModule} from './routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';

@NgModule({
  imports: [
    ComponentsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    Location,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [SurvivorAppRootComponent]
})
export class AppModule { }
