import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import {WalletService, Web3Service} from '../services/services';
import { WalletComponent } from '../app/wallet/wallet.component'

const SERVICES = [
  WalletService,
  Web3Service,
]

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  declarations: [
    AppComponent,
    WalletComponent
  ],
  providers: [SERVICES],
  bootstrap: [AppComponent]
})
export class AppModule { }
