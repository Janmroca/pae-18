import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service'

const metaincoinArtifacts = require('../../build/contracts/Wallet.json');
const contract = require('truffle-contract');

@Injectable()
export class MetaCoinService {

	MetaCoin = contract(metaincoinArtifacts);

  constructor(
  	private web3Ser: Web3Service,
  	) { 
  	// Bootstrap the MetaCoin abstraction for Use
  	this.MetaCoin.setProvider(web3Ser.web3.currentProvider);
  }

  getBalance(account): Promise<number> {
  	let meta;

  	return new Promise((resolve, reject) =>
  		this.MetaCoin
  		  .deployed()
  		  .then(instance => {
					const res = instance.balanceOf.call(account, {
  		      from: account
					});
					console.log(res);
					resolve(res);
				})
  		  .catch(e => {
  		    console.log(e);
  		    reject(e);
  		  }));
  }
}
