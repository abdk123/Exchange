import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { CompanyComponent } from './company/company.component';
import { CountryComponent } from './country/country.component';
import { CurrencyComponent } from './currency/currency.component';
import { ExpenseComponent } from './expense/expense.component';
import { IncomeComponent } from './income/income.component';
import { SettingComponent } from './setting.component';

const routes: Routes = [{
  path: '',
  component: SettingComponent,
  children: [
    {
      path: 'country',
      component: CountryComponent,
      data: { permission : 'Pages.Countries' },
      canActivate: [AppRouteGuard]
    },
    {
      path: 'currency',
      component: CurrencyComponent,
      data: { permission : 'Pages.Currencies' },
      canActivate: [AppRouteGuard]
    },
    {
      path: 'company',
      component: CompanyComponent,
      data: { permission : 'Pages.Companies' },
      canActivate: [AppRouteGuard]
    },
    {
      path: 'expense',
      component: ExpenseComponent,
      data: { permission : 'Pages.Expenses' },
      canActivate: [AppRouteGuard]
    },
    {
      path: 'income',
      component: IncomeComponent,
      data: { permission : 'Pages.Incomes' },
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
export class SettingRoutingModule { }
