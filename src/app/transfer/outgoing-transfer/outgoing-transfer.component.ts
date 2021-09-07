import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { LocalizationHelper } from '@shared/localization/localization-helper';
import { ClientDto, ClientServiceProxy, CompanyDto, CompanyServiceProxy, CountryDto, CountryServiceProxy, CurrencyDto, CurrencyServiceProxy, CustomerDto, CustomerServiceProxy, OutgoingTransferDto } from '@shared/service-proxies/service-proxies';
import { L10n, setCulture, loadCldr } from '@syncfusion/ej2-base';
import { result } from 'lodash-es';

setCulture('ar-SY');
L10n.load(LocalizationHelper.getArabicResources());

@Component({
  selector: 'app-outgoing-transfer',
  templateUrl: './outgoing-transfer.component.html',
  styleUrls: ['./outgoing-transfer.component.scss']
})
export class OutgoingTransferComponent  extends AppComponentBase implements OnInit {

  outgoingTransfer: OutgoingTransferDto = new OutgoingTransferDto();

  currencies: CurrencyDto[] = [];
  companies: CompanyDto[] = [];
  countries: CountryDto[] = [];
  clients: ClientDto[] = [];
  customers: CustomerDto[] = [];
  paymentTypes: object[] = [];


  public fields: Object = { text: 'name', value: 'id' };
  public autoCompleteFields: Object = { value: 'name' };

  constructor(
    injector: Injector,
    private _currencyAppService: CurrencyServiceProxy,
    private _companyAppService: CompanyServiceProxy,
    private _countryAppService: CountryServiceProxy,
    private _clientAppService: ClientServiceProxy,
    private _customerAppService: CustomerServiceProxy,
    ) 
  { 
    super(injector);
    loadCldr(
      require("cldr-data/main/ar-SY/numbers.json"),
      require("cldr-data/main/ar-SY/ca-gregorian.json"),
      require("cldr-data/supplemental/numberingSystems.json"),
      require("cldr-data/main/ar-SY/timeZoneNames.json"),
      require('cldr-data/supplemental/weekdata.json') 
    );
  }

  ngOnInit(): void {
    this.outgoingTransfer.date = new Date().toISOString();
    if(this.outgoingTransfer.beneficiary == undefined)
      this.outgoingTransfer.beneficiary=new CustomerDto();

    if(this.outgoingTransfer.sender == undefined)
      this.outgoingTransfer.sender=new CustomerDto();

    this.initialCurrencies();
    this.initialCompanies();
    this.initialCountries();
    this.initialClients();
    this.initialCustomers();

    this.paymentTypes = [
      {'name' : 'نقدي' , 'id' : 0},
      {'name' : 'ذمم' , 'id' : 1},
      {'name' : 'شركة' , 'id' : 2},
    ];

    this.outgoingTransfer.paymentType = 0;
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

  initialCustomers(){
    this._customerAppService.getAll()
    .subscribe(result => this.customers = result);
  }

  save(){
    this.outgoingTransfer.senderId = this.outgoingTransfer.sender?.id;
    this.outgoingTransfer.beneficiaryId = this.outgoingTransfer.beneficiary?.id;
    console.log(this.outgoingTransfer);
  }

  getAmountWithCurrency(number){
    if(this.outgoingTransfer.currencyId != undefined){
      let selectedCurrency = this.currencies.find( c => c.id == this.outgoingTransfer.currencyId);
      return this.numberWithCommas(number) + '  ' + selectedCurrency.name;
    }
      

      return this.numberWithCommas(number);
  }

  onChangeBeneficiary(args:any){
    if(args.itemData !=undefined && args.itemData.id != undefined){
      this.outgoingTransfer.beneficiary = args.itemData;
    }
  }

  onChangeSender(args:any){
    if(args.itemData !=undefined && args.itemData.id != undefined){
      this.outgoingTransfer.sender = args.itemData;
    }
  }


}
