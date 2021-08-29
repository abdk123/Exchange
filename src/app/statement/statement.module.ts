import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '@theme/theme.module';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { StatementRoutingModule } from './statement-routing.module';
import { StatementComponent } from './statement.component';
import { EditService, FilterService, ForeignKeyService, GridModule, GroupService, PageService, SortService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { MaskedTextBoxModule, NumericTextBoxModule, TextBoxModule, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { CalendarModule, DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ClientBalanceStatementComponent } from './client-balance-statement/client-balance-statement.component';
import { NbActionsModule, NbAlertModule, NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CompanyBalanceStatementComponent } from './company-balance-statement/company-balance-statement.component';
import { TreasuryBalanceStatementComponent } from './treasury-balance-statment/treasury-balance-statement.component';


const NB_MODULES = [
  NbActionsModule,
  NbIconModule,
  NbEvaIconsModule,
  NbDialogModule.forChild(),
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NbAlertModule,
  
];
const SYNCFUSION_MODULES = [
  GridModule,
  ToolbarModule,
  UploaderModule,
  TextBoxModule,
  NumericTextBoxModule,
  CalendarModule,
  DatePickerModule,
  MaskedTextBoxModule,
  DropDownListModule,
  SwitchModule 
  
];

const SYNCFUSION_SERVICES = [
  PageService,
  SortService,
  FilterService,
  GroupService,
  ToolbarService,
  ForeignKeyService,
  EditService
];

@NgModule({
  declarations: [StatementComponent, ClientBalanceStatementComponent, CompanyBalanceStatementComponent, TreasuryBalanceStatementComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    SharedModule,
    ServiceProxyModule,
    ThemeModule,
    StatementRoutingModule,
    ...SYNCFUSION_MODULES,
    ...NB_MODULES
  ],
  providers: [
    ...SYNCFUSION_SERVICES,
  ],
  entryComponents: [

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ]
})
export class StatementModule { }
