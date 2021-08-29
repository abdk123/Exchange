import { supportsPassiveEventListeners } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, Component, Inject, Injector, OnInit, Optional, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { API_BASE_URL, ClientDto, ClientServiceProxy, CurrencyDto, CurrencyServiceProxy } from '@shared/service-proxies/service-proxies';
import { GridComponent, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DataManager, UrlAdaptor, Query, Predicate  } from '@syncfusion/ej2-data';
import { L10n, setCulture, loadCldr } from '@syncfusion/ej2-base';
import { LocalizationHelper } from '@shared/localization/localization-helper';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ClientBalanceFilterInput } from './client-balance-filter-input'

setCulture('ar-SY');
L10n.load(LocalizationHelper.getArabicResources());

@Component({
  selector: 'app-client-balance-statement',
  templateUrl: './client-balance-statement.component.html',
  styleUrls: ['./client-balance-statement.component.scss'],
})
export class ClientBalanceStatementComponent extends AppComponentBase  implements OnInit {

  // Grid
  @ViewChild('cashFlowGrid') public grid: GridComponent;
  public dataSource: DataManager;
  private baseUrl: string;
  public pageSettings: PageSettingsModel;
  public pageSizes: number[] = [10, 20, 100];
  filterParams: Predicate;
  input: ClientBalanceFilterInput = new ClientBalanceFilterInput();
  clients: ClientDto[] = [];
  currencies: CurrencyDto[] = [];
  fromDate: Date = new Date();
  toDate: Date = new Date();
  filtering: boolean = false;
  public fields: Object = { text: 'name', value: 'id' };

  constructor(
    injector: Injector,
    private _currencyAppService: CurrencyServiceProxy,
    private _clientAppService: ClientServiceProxy,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
    ) { 
    super(injector);
    this.baseUrl = baseUrl;
    loadCldr(
      require("cldr-data/main/ar-SY/numbers.json"),
      require("cldr-data/main/ar-SY/ca-gregorian.json"),
      require("cldr-data/supplemental/numberingSystems.json"),
      require("cldr-data/main/ar-SY/timeZoneNames.json"),
      require('cldr-data/supplemental/weekdata.json') 
    );

  }

  ngOnInit(): void {
    this.input.fromDate = new Date().toISOString();
    this.input.toDate = new Date().toISOString();
    this.initialClients();
    this.initialCurrencies();
    
    this.pageSettings = {pageSize: 10, pageCount: 10, pageSizes: this.pageSizes};
    this.dataSource = new DataManager({
      url: this.baseUrl + '/api/services/app/ClientCashFlow/GetForGrid',
      adaptor: new UrlAdaptor()
    });
  }

  initialCurrencies(){
    this._currencyAppService.getAll()
    .subscribe(result => {
      this.currencies = result;
    });
  }

  initialClients(){
    this._clientAppService.getAll()
    .subscribe(result => this.clients = result);
  }

  filter():void{
    
    this.filterParams = undefined;
    if(this.input.clientId != undefined){
      this.addToFilterParams('clientId','equal',this.input.clientId);
    }
    if(this.input.currencyId != undefined){
      this.addToFilterParams('currencyId','equal',this.input.currencyId);
    }
    if(this.input.fromDate != undefined){
      this.addToFilterParams('fromDate','equal',this.input.fromDate);
    }
    if(this.input.toDate != undefined){
      this.addToFilterParams('toDate','equal',this.input.toDate);
    }
    if(this.filtering){
      this.grid.query = new Query().where(this.filterParams);
      
      this.grid.refresh();
    }
  }

  addToFilterParams(key: string,op: string,value: any){
    this.filtering = true;
    if(this.filterParams == undefined){
      this.filterParams= new Predicate(key, op, value, true); 
    }else{
      this.filterParams= this.filterParams.and(key, op, value, true);
    }
  }

  

}
