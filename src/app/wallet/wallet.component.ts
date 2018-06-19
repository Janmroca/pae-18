import { Component, HostListener, NgZone } from '@angular/core';

import {Web3Service, WalletService} from '../../services/services'

import { canBeNumber } from '../../util/validation';

declare var window: any;
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})

export class WalletComponent {

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
    ) {
    this.onReady();
  }

  onReady = () => {

    this.web3Service.getAccounts().subscribe(accs => {
      this.accounts = accs;
      this.account = this.accounts[0];

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
