import { Component } from '@angular/core';

import {Web3Service, EventService} from '../../services/services'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent
{

  account: any;
  accounts: any;

  status: string;
  events = [];

  constructor(
    private web3Service: Web3Service,
    private eventService: EventService
    )
    {
      this.onReady();
    }

  onReady = () => {

    this.web3Service.getAccounts().subscribe(accs => {
      this.accounts = accs;
      this.account = this.accounts[0];

    }, err => alert(err));

    this.eventService.getEvents(this.account)
      .then( retrievedEvents => {
        retrievedEvents.forEach(element => {
          this.eventService.getEventData(element)
            .then( eventData => {
              this.addEvent(eventData);
            })
        })
      }, e => this.setStatus('Error getting events; see log.'));

      };

  setStatus = message => {
    this.status = message;
  };

  addEvent = data => {
    this.events.push(data);
  };

  buyTicket = (address) =>
  {
    this.eventService.buyTickets(address, 1, this.account)
      .then( retrievedEvents => {
      }, e => this.setStatus('Error buying ticket; see log.'));
  };

  sellTicket = (address) =>
  {
    this.eventService.sellTickets(address, 1, this.account)
      .then( retrievedEvents => {
      }, e => this.setStatus('Error selling ticket; see log.'));
  };

  redeemTicket = (address) =>
  {
    this.eventService.redeemTicket(address, this.account)
      .then( retrievedEvents => {
      }, e => this.setStatus('Error redeeming ticket; see log.'));
  };

  releasePayment = (address) =>
  {
    this.eventService.releasePayment(address, this.account)
      .then( retrievedEvents => {
      }, e => this.setStatus('Error releasing payment; see log.'));
  }
}
