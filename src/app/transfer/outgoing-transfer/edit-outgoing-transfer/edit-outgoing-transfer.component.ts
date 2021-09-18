import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { LocalizationHelper } from '@shared/localization/localization-helper';
import { ClientDto, ClientServiceProxy, CompanyDto, CompanyServiceProxy, CountryDto, CountryServiceProxy, CurrencyDto, CurrencyServiceProxy, CustomerDto, CustomerServiceProxy, OutgoingTransferDto, OutgoingTransferServiceProxy } from '@shared/service-proxies/service-proxies';
import { L10n, setCulture, loadCldr } from '@syncfusion/ej2-base';
import { finalize } from 'rxjs/operators';

setCulture('ar-SY');
L10n.load(LocalizationHelper.getArabicResources());

@Component({
  selector: 'app-edit-outgoing-transfer',
  templateUrl: './edit-outgoing-transfer.component.html',
  styleUrls: ['./edit-outgoing-transfer.component.scss']
})
export class EditOutgoingTransferComponent extends AppComponentBase implements OnInit {

  outgoingTransfer: OutgoingTransferDto = new OutgoingTransferDto();
  previousBalance: number = 0.0;
  currentBalance: number = 0.0;
  requiredAmount: number = 0.0;
  previousBalanceForToCompany: number = 0.0;
  currentBalanceForToCompany: number = 0.0;
  saving = false;
  transferId: number;
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
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _currencyAppService: CurrencyServiceProxy,
    private _companyAppService: CompanyServiceProxy,
    private _countryAppService: CountryServiceProxy,
    private _clientAppService: ClientServiceProxy,
    private _customerAppService: CustomerServiceProxy,
    private _outgoingTransferAppService: OutgoingTransferServiceProxy
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
    // this.outgoingTransfer.date = new Date().toISOString();
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
    
    if(history.state != undefined && history.state.name != undefined && history.state.name == 'edit-outgoing-transfer'){
      this.transferId = +history.state.id;
      if(this.transferId != undefined){
        this._outgoingTransferAppService.getById(this.transferId)
        .subscribe(result => {
          this.outgoingTransfer = result
        });
      }
    }
    
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
    this.saving = true;
    this._outgoingTransferAppService
      .create(this.outgoingTransfer)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.outgoingTransfer = new OutgoingTransferDto();
      });
  }

  onPaymentTypeChange(args:any){
    this.outgoingTransfer.receivedAmount = 0;
  }

  onChangeBeneficiary(args:any){
    if(args.itemData !=undefined && args.itemData.id != undefined){
      this.outgoingTransfer.beneficiary = args.itemData;
    }else{
      if(this.outgoingTransfer.beneficiary != undefined){
        this.outgoingTransfer.beneficiary.phoneNumber = '';
        this.outgoingTransfer.beneficiary.address = '';
      }
    }
  }

  onChangeSender(args:any){
    if(args.itemData != undefined && args.itemData.id != undefined){
      this.outgoingTransfer.sender = args.itemData;
    }else{
      if(this.outgoingTransfer.sender != undefined){
        this.outgoingTransfer.sender.phoneNumber = '';
        this.outgoingTransfer.sender.address = '';
      }
    }
  }

  onCurrencyChange(args: any){
    if(args.itemData != undefined && 
      args.itemData.id != undefined){
        if(this.outgoingTransfer.paymentType == 1 && this.outgoingTransfer.fromClientId != undefined)
          this.getFromClientBalance(this.outgoingTransfer.fromClientId, args.itemData.id);

        if(this.outgoingTransfer.paymentType == 2 && this.outgoingTransfer.fromCompanyId != undefined)
          this.getFromCompanyBalance(this.outgoingTransfer.fromCompanyId, args.itemData.id);

        if(this.outgoingTransfer.toCompanyId != undefined)
          this.getToCompanyBalance(this.outgoingTransfer.toCompanyId, args.itemData.id);
      } 
  }

  onToCompanyChange(args: any){
    if(args.itemData != undefined && 
      args.itemData.id != undefined && 
      this.outgoingTransfer.currencyId != undefined){
        this.getToCompanyBalance(args.itemData.id, this.outgoingTransfer.currencyId);
    }
  }

  onFromCompanyChange(args: any){
    if(args.itemData != undefined && 
      args.itemData.id != undefined && 
      this.outgoingTransfer.currencyId != undefined){
        this.getFromCompanyBalance(args.itemData.id, this.outgoingTransfer.currencyId);
    }
  }

  onFromClientChange(args: any){
    if(args.itemData != undefined && 
      args.itemData.id != undefined && 
      this.outgoingTransfer.currencyId != undefined){
        this.getFromClientBalance(args.itemData.id, this.outgoingTransfer.currencyId);
    }
  }

  onAmountChange(args: any){
    if(args != undefined && this.outgoingTransfer.currencyId != undefined){
      console.log(this.outgoingTransfer);
      if(this.outgoingTransfer.paymentType == 1 && this.outgoingTransfer.fromClientId != undefined){
        this.getFromClientBalance(this.outgoingTransfer.fromClientId, this.outgoingTransfer.currencyId);
      }else if(this.outgoingTransfer.paymentType == 2 && this.outgoingTransfer.fromCompanyId != undefined){
        this.getFromCompanyBalance(this.outgoingTransfer.fromCompanyId, this.outgoingTransfer.currencyId);
      }

      this.getToCompanyBalance(this.outgoingTransfer.toCompanyId, this.outgoingTransfer.currencyId);
  }
  }

  onCompanyCommissionChange(args:any){
    if(args != undefined && this.outgoingTransfer.currencyId != undefined){
      this.getToCompanyBalance(this.outgoingTransfer.toCompanyId, this.outgoingTransfer.currencyId);
    }
  }

  getFromClientBalance(clientId, currencyId){
    this._clientAppService.getCurrentBalance(clientId, currencyId)
    .subscribe(result => {
      this.previousBalance = result.balance;
      this.resolveValues();
      this.requiredAmount = (this.outgoingTransfer.amount + this.outgoingTransfer.commission);
      this.currentBalance = this.outgoingTransfer.amount != undefined ? (result.balance + this.requiredAmount) : result.balance;
    });
  }

  getFromCompanyBalance(companyId, currencyId){
    this._companyAppService.getCurrentBalance(companyId, currencyId)
    .subscribe(result => {
      this.previousBalance = result.balance;
      this.resolveValues();
      this.requiredAmount = (this.outgoingTransfer.amount + this.outgoingTransfer.commission);
      
      this.currentBalance = this.outgoingTransfer.amount != undefined ? (result.balance + this.requiredAmount) : result.balance;
    });
  }

  getToCompanyBalance(toCompanyId, currencyId){
    this._companyAppService.getCurrentBalance(toCompanyId, currencyId)
    .subscribe(result => {
      this.previousBalanceForToCompany = result.balance;
      this.resolveValues();
      this.requiredAmount = (this.outgoingTransfer.amount + this.outgoingTransfer.commission);
      var value = (this.outgoingTransfer.amount + this.outgoingTransfer.companyCommission);
      this.currentBalanceForToCompany = this.outgoingTransfer.amount != undefined ? (result.balance - value) : result.balance;
    });
  }

  resolveValues(){
    this.outgoingTransfer.amount = this.outgoingTransfer.amount != undefined ? this.outgoingTransfer.amount : 0;
    this.outgoingTransfer.commission = this.outgoingTransfer.commission != undefined ? this.outgoingTransfer.commission : 0;
    this.outgoingTransfer.companyCommission = this.outgoingTransfer.companyCommission != undefined ? this.outgoingTransfer.companyCommission : 0;
  }

  getAmountWithCurrency(number){
    if(this.outgoingTransfer.currencyId != undefined && number != 0 && number != undefined){
      let selectedCurrency = this.currencies.find( c => c.id == this.outgoingTransfer.currencyId);
      return this.getBalance(number) + '  ' + selectedCurrency.name;
    }
      return 0;
  }

}
