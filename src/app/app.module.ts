import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { TooltipModule } from "ngx-bootstrap/tooltip";

import {WalletService, Web3Service, EventService} from '../services/services';
import { WalletComponent } from '../app/wallet/wallet.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { EventsComponent } from '../app/events/events.component';
import { EventgeneratorComponent } from '../app/eventgenerator/eventgenerator.component';

const SERVICES = [
  EventService,
  WalletService,
  Web3Service
]

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    TooltipModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    WalletComponent,
    EventsComponent,
    EventgeneratorComponent
  ],
  providers: [SERVICES],
  bootstrap: [AppComponent]
})
export class AppModule { }
