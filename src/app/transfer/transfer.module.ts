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
import { AccordionModule, ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { MaskedTextBoxModule, NumericTextBoxModule, TextBoxModule, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { CalendarModule, DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { AutoCompleteModule, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CompanyServiceProxy, CountryServiceProxy, CurrencyServiceProxy, OutgoingTransferServiceProxy } from '@shared/service-proxies/service-proxies';
import { IncomeTransferComponent } from './income-transfer/income-transfer.component';
import { CreateOutgoingTransferComponent } from './outgoing-transfer/create-outgoing-transfer/create-outgoing-transfer.component';
import { EditOutgoingTransferComponent } from './outgoing-transfer/edit-outgoing-transfer/edit-outgoing-transfer.component';
import { SearchOutgoingTransferComponent } from './outgoing-transfer/search-outgoin-transfer/search-outgoing-transfer.component';

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
  AutoCompleteModule,
  AccordionModule 
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
  declarations: [
    TransferComponent, 
    IncomeTransferComponent, 
    CreateOutgoingTransferComponent, 
    EditOutgoingTransferComponent, 
    SearchOutgoingTransferComponent
  ],
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
    CountryServiceProxy,
    OutgoingTransferServiceProxy
  ],
  entryComponents: [

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ]
})
export class TransferModule { }
