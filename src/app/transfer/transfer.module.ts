import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '@theme/theme.module';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { 
  NbActionsModule, 
  NbAlertModule, 
  NbButtonModule, 
  NbCardModule, 
  NbDialogModule, 
  NbIconModule, 
  NbInputModule, 
  NbCheckboxModule,
  NbSelectModule } from '@nebular/theme';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { TransferRoutingModule } from './transfer-routing.module';
import { TransferComponent } from './transfer.component';
import { 
  EditService, 
  FilterService, 
  ForeignKeyService, 
  GridModule, 
  GroupService, 
  PageService, 
  SortService, 
  ToolbarService } from '@syncfusion/ej2-angular-grids';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { MaskedTextBoxModule, NumericTextBoxModule, TextBoxModule, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { CalendarModule, DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { AutoCompleteModule, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { OutgoingTransferComponent } from './outgoing-transfer/outgoing-transfer.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CompanyServiceProxy, CountryServiceProxy, CurrencyServiceProxy } from '@shared/service-proxies/service-proxies';

const SYNCFUSION_MODULES = [
  //GridModule,
  //ToolbarModule,
  //UploaderModule,
  TextBoxModule,
  NumericTextBoxModule,
  CalendarModule,
  DatePickerModule,
  MaskedTextBoxModule,
  DropDownListModule,
  SwitchModule,
  AutoCompleteModule 
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

const NB_MODULES = [
  NbActionsModule,
  NbIconModule,
  NbEvaIconsModule,
  NbDialogModule.forChild(),
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NbSelectModule,
  NbAlertModule,
  NbCheckboxModule
];

@NgModule({
  declarations: [TransferComponent, OutgoingTransferComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    SharedModule,
    ServiceProxyModule,
    ThemeModule,
    TransferRoutingModule,
    ...SYNCFUSION_MODULES,
    ...NB_MODULES,
  ],
  providers: [
    ...SYNCFUSION_SERVICES,
    CurrencyServiceProxy,
    CompanyServiceProxy,
    CountryServiceProxy
  ],
  entryComponents: [

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ]
})
export class TransferModule { }
