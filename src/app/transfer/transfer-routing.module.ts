import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { OutgoingTransferComponent } from './outgoing-transfer/outgoing-transfer.component';
import { TransferComponent } from './transfer.component';

const routes: Routes = [{
  path: '',
  component: TransferComponent,
  children: [
    {
      path: 'outgoing-transfer',
      component: OutgoingTransferComponent,
      data: { permission : 'Pages.OutgoingTransfers' },
      canActivate: [AppRouteGuard]
    },
    
    
  ],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class TransferRoutingModule { }
