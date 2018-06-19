import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletComponent }      from '../wallet/wallet.component';
import { EventsComponent } from '../events/events.component'
import { EventgeneratorComponent } from '../eventgenerator/eventgenerator.component'

const routes: Routes = [
  { path: '', component: EventsComponent },
  { path: 'wallet', component: WalletComponent },
  { path: 'newEvent', component: EventgeneratorComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {


}