import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service'

const eventArtifacts = require('../../build/contracts/Event.json');
const eventFactoryArtifacts = require('../../build/contracts/EventFactory.json');
const contract = require('truffle-contract');

@Injectable()
export class EventService {

	EventFactory = contract(eventFactoryArtifacts);
	Event = contract(eventArtifacts);

  constructor(
  	private web3Ser: Web3Service,
  	) {
		this.EventFactory.setProvider(web3Ser.web3.currentProvider);
		this.Event.setProvider(web3Ser.web3.currentProvider);
  }

  getEvents(account): Promise<string[]> {

  	return new Promise((resolve, reject) =>
			this.EventFactory
				.deployed()
  		  .then(instance => {
					const res = instance.getEvents.call();
					resolve(res);
				})
				.catch(e => {
  		  	console.log(e);
					reject(e);
				}));
	}

	createEvent(name, description, image, date, duration, entranceDuration, tickets, cost, benefitiaryAddress, account): Promise<number> {

  	return new Promise((resolve, reject) =>
  		this.EventFactory
  		  .deployed()
  		  .then(instance => {
						instance.createEvent(name, description, image, date, duration, entranceDuration, tickets, cost, benefitiaryAddress)
						.catch( e => reject(e) )
				})
  		  .catch(e => {
  		    console.log(e);
  		    reject(e);
  		  }));
	}

	getEventData(eventAddress): Promise<any> {
		return new Promise((resolve, reject) =>
			this.Event
				.at(eventAddress)
				.then(instance => {
					const res: any = {};
					let count: number = 0;

					var checkFinished = () => {
						count += 1;
						if (count === 16) resolve(res);
					}

					instance.m_Name().then(val => { res.name = this.web3Ser.web3.toAscii(val).replace(/\u0000/g,''); checkFinished(); });
					instance.m_Description().then(val => { res.description = this.web3Ser.web3.toAscii(val).replace(/\u0000/g,''); checkFinished();  });
					instance.m_Image().then(val => { res.image = this.web3Ser.web3.toAscii(val).replace(/\u0000/g,''); checkFinished();  });
					instance.m_StartDate().then(val => { res.startDate = val.toNumber(); checkFinished();  });
					instance.m_EntranceDate().then(val => { res.entranceDate = val.toNumber(); checkFinished();  });
					instance.m_FinishDate().then(val => { res.finishDate = val.toNumber(); checkFinished();  });
					instance.m_TotalTickets().then(val => { res.totalTickets = val.toNumber(); checkFinished();  });
					instance.m_Cost().then(val => { res.costTicket = val.toNumber(); checkFinished();  });
					instance.m_TicketsLeft().then(val => { res.ticketsLeft = val.toNumber(); checkFinished();  });
					instance.m_Owner().then(val => { res.owner = val; checkFinished();  });
					instance.isBenefitiary().then(val => { res.isBenefitiary = val; checkFinished();  });
					instance.isEntranceOpen().then(val => { res.isEntranceOpen = val; checkFinished();  });
					instance.hasFinished().then(val => { res.hasFinished = val; checkFinished();  });
					instance.hasStarted().then(val => { res.hasStarted = val; checkFinished();  });
					instance.amountOfTickets().then(val => { res.boughtTickets = val.toNumber(); checkFinished();  });
					instance.amountOfRedeemedTickets().then(val => { res.redeemedTickets = val.toNumber(); checkFinished();  });

				})
				.catch(e => {
					console.log(e);
					reject(e);
				}));
	}

	checkFinished(val): boolean {
		++val;
		return false;

	}

	buyTickets(eventAddress, amount, account): Promise<any> {

		return new Promise((resolve, reject) =>
			this.Event
				.at(eventAddress)
				.then(instance => {
					instance.buyTickets(amount, {from: account })
						.then( result => resolve() )
						.catch( e => reject(e) )
				})
  		  .catch(e => {
  		    console.log(e);
  		    reject(e);
			}));
	}

	sellTickets(eventAddress, amount, account): Promise<any> {

		return new Promise((resolve, reject) =>
			this.Event
				.at(eventAddress)
				.then(instance => {
					instance.sellTickets(amount, {from: account })
						.then( result => resolve() )
						.catch( e => reject(e) )
				})
  		  .catch(e => {
  		    console.log(e);
  		    reject(e);
			}));
	}

	redeemTicket(eventAddress, account): Promise<any> {

		return new Promise((resolve, reject) =>
			this.Event
				.at(eventAddress)
				.then(instance => {
					instance.redeemTicket({from: account })
						.then( result => resolve() )
						.catch( e => reject(e) )
				})
  		  .catch(e => {
  		    console.log(e);
  		    reject(e);
			}));
	}

	releasePayment(eventAddress, account): Promise<any> {

		return new Promise((resolve, reject) =>
			this.Event
				.at(eventAddress)
				.then(instance => {
					instance.releasePayment({from: account })
						.then( result => resolve() )
						.catch( e => reject(e) )
				})
  		  .catch(e => {
  		    console.log(e);
  		    reject(e);
			}));
	}

}
