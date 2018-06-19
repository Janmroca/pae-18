import { Component, HostListener, NgZone } from '@angular/core';

import {Web3Service, WalletService, EventService} from '../services/services'

import { canBeNumber } from '../util/validation';

declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  // TODO add proper types these variables
  account: any;
  accounts: any;

  balance: number;
  sendingAmount: number;
  recipientAddress: string;
  status: string;
  canBeNumber = canBeNumber;

  constructor(
    private _ngZone: NgZone,
    private web3Service: Web3Service,
    private walletService: WalletService,
    private eventService: EventService
    ) {
    this.onReady();
  }

  onReady = () => {

    // this.eventService.createEvent("event", "test", "", 1629316909, 60, 60, 150, 10, this.account, this.account)
    this.eventService.getEventData("0xd4def41a41201d7854bd1dc97c9525d159f59947")
      .then((value => {
        console.log(value);
      })).catch(e =>  console.log(e) );
    // Get the initial account balance so it can be displayed.
    this.web3Service.getAccounts().subscribe(accs => {
      this.accounts = accs;
      this.account = this.accounts[0];

      // This is run from window:load and ZoneJS is not aware of it we
      // need to use _ngZone.run() so that the UI updates on promise resolution
      this._ngZone.run(() =>
        this.refreshBalance()
      );
    }, err => alert(err))
  };

  refreshBalance = () => {
    this.walletService.getBalance(this.account)
      .then(value => {
        this.balance = value
      }, e => {this.setStatus('Error getting balance; see log.')})
  };

  setStatus = message => {
    this.status = message;
  };

  sendCoin = () => {
    this.setStatus('Initiating transaction... (please wait)');

    this.walletService.sendCoins(this.account, this.recipientAddress, this.sendingAmount)
      .then(() => {
        this.setStatus('Transaction complete!');
        this.refreshBalance();
      }, e => this.setStatus('Error sending coin; see log.')
    );
  }
}
