import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { IncomeTransferComponent } from './income-transfer/income-transfer.component';
import { CreateOutgoingTransferComponent } from './outgoing-transfer/create-outgoing-transfer/create-outgoing-transfer.component';
import { EditOutgoingTransferComponent } from './outgoing-transfer/edit-outgoing-transfer/edit-outgoing-transfer.component';
import { SearchOutgoingTransferComponent } from './outgoing-transfer/search-outgoin-transfer/search-outgoing-transfer.component';
import { TransferComponent } from './transfer.component';

const routes: Routes = [{
  path: '',
  component: TransferComponent,
  children: [
    {
      path: 'create-outgoing-transfer',
      component: CreateOutgoingTransferComponent,
      data: { permission : 'Pages.OutgoingTransfers' },
      canActivate: [AppRouteGuard]
    },
    {
      path: 'edit-outgoing-transfer',
      component: EditOutgoingTransferComponent,
      data: { permission : 'Pages.OutgoingTransfers' },
      canActivate: [AppRouteGuard]
    },
    {
      path: 'search-outgoing-transfer',
      component: SearchOutgoingTransferComponent,
      data: { permission : 'Pages.OutgoingTransfers' },
      canActivate: [AppRouteGuard]
    },
    {
      path: 'income-transfer',
      component: IncomeTransferComponent,
      data: { permission : 'Pages.IncomeTransfers.Create' },
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
