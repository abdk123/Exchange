import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { LocalizationHelper } from '@shared/localization/localization-helper';
import { ClientDto, ClientServiceProxy, CompanyDto, CompanyServiceProxy, CountryDto, CountryServiceProxy, CurrencyDto, CurrencyServiceProxy } from '@shared/service-proxies/service-proxies';
import { L10n, setCulture } from '@syncfusion/ej2-base';

setCulture('en');
L10n.load(LocalizationHelper.getArabicResources());

@Component({
  selector: 'app-outgoing-transfer',
  templateUrl: './outgoing-transfer.component.html',
  styleUrls: ['./outgoing-transfer.component.scss']
})
export class OutgoingTransferComponent  extends AppComponentBase implements OnInit {

  date: Date ;
  currency: CurrencyDto = new CurrencyDto();
  toCompany: CompanyDto = new CompanyDto();
  fromCompany: CompanyDto = new CompanyDto();
  fromClient: ClientDto = new ClientDto();
  country: CountryDto = new CountryDto();
  balance: number = 0;
  paymentType: any;
  beneficiary: any;
  sender: any;
  amount: number = 0;
  commission: number = 0;
  companyCommission: number = 0;
  receivedAmount:number = 0;
  reason: string ;
  note: string ;

  currencies: CurrencyDto[] = [];
  companies: CompanyDto[] = [];
  countries: CountryDto[] = [];
  clients: ClientDto[] = [];
  customers: object[] = [];
  paymentTypes: object[] = [];


  public fields: Object = { text: 'name', value: 'id' };

  constructor(
    injector: Injector,
    private _currencyAppService: CurrencyServiceProxy,
    private _companyAppService: CompanyServiceProxy,
    private _countryAppService: CountryServiceProxy,
    private _clientAppService: ClientServiceProxy,
    ) 
  { 
    super(injector);
  }

  ngOnInit(): void {
    this.initialCurrencies();
    this.initialCompanies();
    this.initialCountries();
    this.initialClients();

    this.paymentTypes = [
      {'name' : 'نقدي' , 'id' : 0},
      {'name' : 'ذمم' , 'id' : 1},
      {'name' : 'شركة' , 'id' : 2},
    ];

    this.paymentType = {'name' : 'نقدي' , 'id' : 0};

    this.customers = [
      {'name' : 'محمد' , 'id' : 1 , 'phoneNumber' : '' , 'Address' : ''},
      {'name' : 'علي' , 'id' : 2 , 'phoneNumber' : '' , 'Address' : ''},
    ];

    this.beneficiary = {'name' : 'محمد' , 'id' : 1 , 'phoneNumber' : '' , 'Address' : ''};
    this.sender = {'name' : 'علي' , 'id' : 2 , 'phoneNumber' : '' , 'Address' : ''};
  }

  initialCurrencies(){
    this._currencyAppService.getAll()
    .subscribe(result => this.currencies = result);
  }
  
  initialCompanies(){
    this._companyAppService.getAll()
    .subscribe(result => this.companies = result);
  }

  initialCountries(){
    this._countryAppService.getAll()
    .subscribe(result => this.countries = result);
  }

  initialClients(){
    this._clientAppService.getAll()
    .subscribe(result => this.clients = result);
  }

  save(){

  }

  getAmountWithCurrency(number){
    if(this.currency.id != undefined){
      let selectedCurrency = this.currencies.find( c => c.id == this.currency.id);
      return this.numberWithCommas(number) + '  ' + selectedCurrency.name;
    }
      

      return this.numberWithCommas(number);
  }
}
