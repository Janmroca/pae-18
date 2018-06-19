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
					instance.getEvents.call();
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
					const res : any = {};

					instance.m_Name().then(val => { res.name = this.web3Ser.web3.toAscii(val).replace(/\u0000/g,'') });
					instance.m_Description().then(val => { res.description = this.web3Ser.web3.toAscii(val).replace(/\u0000/g,'') });
					instance.m_Image().then(val => { res.image = this.web3Ser.web3.toAscii(val).replace(/\u0000/g,'') });
					instance.m_StartDate().then(val => { res.startDate = val.toNumber() });
					instance.m_EntranceDate().then(val => { res.entranceDate = val.toNumber() });
					instance.m_FinishDate().then(val => { res.finishDate = val.toNumber() });
					instance.m_TotalTickets().then(val => { res.totalTickets = val.toNumber() });
					instance.m_Cost().then(val => { res.costTicket = val.toNumber() });
					instance.m_TicketsLeft().then(val => { res.ticketsLeft = val.toNumber() });
					instance.m_Owner().then(val => { res.owner = val });
					instance.isBenefitiary().then(val => { res.isBenefitiary = val });
					instance.isEntranceOpen().then(val => { res.isEntranceOpen = val });
					instance.hasFinished().then(val => { res.hasFinished = val });
					instance.hasStarted().then(val => { res.hasStarted = val });
					instance.amountOfTickets().then(val => { res.boughtTickets = val.toNumber() });
					instance.amountOfRedeemedTickets().then(val => { res.redeemedTickets = val.toNumber() });

					resolve(res);
				})
				.catch(e => {
					console.log(e);
					reject(e);
				}));
	}
}
