import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service'

const walletArtifacts = require('../../build/contracts/Wallet.json');
const contract = require('truffle-contract');

@Injectable()
export class WalletService {

	Wallet = contract(walletArtifacts);

  constructor(
  	private web3Ser: Web3Service,
  	) { 
  	this.Wallet.setProvider(web3Ser.web3.currentProvider);
  }

  getBalance(account): Promise<number> {

  	return new Promise((resolve, reject) =>
  		this.Wallet
  		  .deployed()
  		  .then(instance => {
					const res = instance.balanceOf.call(account, {
  		      from: account
					});
					resolve(res);
				})
  		  .catch(e => {
  		    console.log(e);
  		    reject(e);
  		  }));
	}

	sendCoins(from, to, amount): Promise<number> {

  	return new Promise((resolve, reject) =>
  		this.Wallet
  		  .deployed()
  		  .then(instance => {
					instance.transferFrom(from, to, amount, {from: from })
						.then( result => resolve() )
						.catch( e => reject(e) )
				})
  		  .catch(e => {
  		    console.log(e);
  		    reject(e);
  		  }));
  }
}
