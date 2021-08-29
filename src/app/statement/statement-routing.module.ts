import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { ClientBalanceStatementComponent } from './client-balance-statement/client-balance-statement.component';
import { CompanyBalanceStatementComponent } from './company-balance-statement/company-balance-statement.component';
import { StatementComponent } from './statement.component';
import { TreasuryBalanceStatementComponent } from './treasury-balance-statment/treasury-balance-statement.component';

const routes: Routes = [{
  path: '',
  component: StatementComponent,
  children: [
    {
      path: 'client-balance-statement',
      component: ClientBalanceStatementComponent,
      //data: { permission : 'Pages.ClientBalanceStatements' },
      canActivate: [AppRouteGuard]
    },
    {
      path: 'company-balance-statement',
      component: CompanyBalanceStatementComponent,
      //data: { permission : 'Pages.CompanyBalanceStatements' },
      canActivate: [AppRouteGuard]
    },
    {
      path: 'treasury-balance-statement',
      component: TreasuryBalanceStatementComponent,
      //data: { permission : 'Pages.CompanyBalanceStatements' },
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
export class StatementRoutingModule { }
