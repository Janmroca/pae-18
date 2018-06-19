import { Component, OnInit } from '@angular/core';

import {Web3Service, EventService} from '../../services/services'

@Component({
  selector: 'app-eventgenerator',
  templateUrl: './eventgenerator.component.html',
  styleUrls: ['./eventgenerator.component.css']
})

export class EventgeneratorComponent
{
  account: any;
  accounts: any;

  status: string;

  name: string;
  description: string;
  image: string;
  date: number;
  duration: number;
  entranceDuration : number;
  tickets: number;
  cost: number;
  benefitiaryAddress: string;

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

};

  setStatus = message => {
    this.status = message;
  };

  createEvent = () =>
  {
    this.eventService.createEvent(this.name, this.description, this.image, this.date, this.duration, this.entranceDuration, this.tickets, this.cost, this.benefitiaryAddress, this.account)
      .then( retrievedEvents => {

      }, e => this.setStatus('Error creating event; see log.'));

  };

}