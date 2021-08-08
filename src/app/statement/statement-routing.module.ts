import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatementComponent } from './statement.component';

const routes: Routes = [{
  path: '',
  component: StatementComponent,
  children: [
    // {
    //   path: 'client-balance-statement',
    //   component: ClientBalanceStatementComponent,
    //   data: { permission : 'Pages.ClientBalanceStatements' },
    //   canActivate: [AppRouteGuard]
    // },
    
    
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
