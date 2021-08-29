import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { LocalizationHelper } from '@shared/localization/localization-helper';
import { ClientDto, ClientServiceProxy, CompanyDto, CompanyServiceProxy, CountryDto, CountryServiceProxy, CurrencyDto, CurrencyServiceProxy, CustomerDto, CustomerServiceProxy, ExchangePartyDto, ExpenseDto, ExpenseServiceProxy, IncomeDto, IncomeServiceProxy, TreasuryActionDto, TreasuryActionServiceProxy, TreasuryDto } from '@shared/service-proxies/service-proxies';
import { highlightSearch } from '@syncfusion/ej2-angular-dropdowns';
import { L10n, setCulture, loadCldr  } from '@syncfusion/ej2-base';
import { result } from 'lodash-es';
import { finalize } from 'rxjs/operators';

setCulture('ar-SY');
L10n.load(LocalizationHelper.getArabicResources());
declare var require: any;

@Component({
  selector: 'app-treasury-action',
  templateUrl: './treasury-action.component.html',
  styleUrls: ['./treasury-action.component.scss']
})
export class TreasuryActionComponent  extends AppComponentBase implements OnInit {

  treasuryAction: TreasuryActionDto = new TreasuryActionDto();
  exchangeParty: ExchangePartyDto = new ExchangePartyDto();
  saving = false;
  currencies: CurrencyDto[] = [];
  companies: CompanyDto[] = [];
  countries: CountryDto[] = [];
  clients: ClientDto[] = [];
  expenses: ExpenseDto[] = [];
  incomes: IncomeDto[] = [];
  beneficiaries: CustomerDto[] = [];
  paymentTypes: object[] = [];
  actionTypes: object[] = [];
  mainAccounts: object[] = [];
  mainAccountsIncome: object[] = [];
  mainAccountsExpense: object[] = [];
  exchangeParties: ExchangePartyDto[] = [];
  previousBalance: number = 0.0;
  currentBalance: number = 0.0;
  date: Date = new Date();

  public fields: Object = { text: 'name', value: 'id' };
  public exchangePartyFields: Object = { text: 'name', value: 'exchangePartyId' };

  constructor(
    injector: Injector,
    private _currencyAppService: CurrencyServiceProxy,
    private _customerAppService: CustomerServiceProxy,
    private _treasuryActionAppService: TreasuryActionServiceProxy,
    private _companyAppService: CompanyServiceProxy,
    private _countryAppService: CountryServiceProxy,
    private _clientAppService: ClientServiceProxy,
    private _expenseAppService: ExpenseServiceProxy,
    private _incomeAppService: IncomeServiceProxy
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
    this.treasuryAction.date = new Date().toISOString();
    this.initialMainAccounts();
    this.initialCurrencies();
    this.initialExchangeParties();
    
    this.actionTypes = [
      {'name' : 'صرف' , 'id' : 0},
      {'name' : 'قبض' , 'id' : 1}
    ];
        
  }

  initialMainAccounts(){
    this.mainAccountsIncome = [
      {'name' : 'ذمم عملاء' , 'id' : 0},
      {'name' : 'ذمم شركات' , 'id' : 1},
      {'name' : 'إيرادات عامة' , 'id' : 2}
    ];

    this.mainAccountsExpense = [
      {'name' : 'ذمم عملاء' , 'id' : 0},
      {'name' : 'ذمم شركات' , 'id' : 1},
      {'name' : 'مصاريف عامة' , 'id' : 3},
      {'name' : 'حوالات مباشرة' , 'id' : 4},
    ];

    if(this.treasuryAction.actionType == 0){
      this.mainAccounts = this.mainAccountsExpense;
    }else if(this.treasuryAction.actionType == 1){
      this.mainAccounts = this.mainAccountsIncome;
    }else{
      this.mainAccounts = [];
    }
  }

  initialExpenses(){
    this._expenseAppService.getAll()
    .subscribe(result => {
      this.expenses = result;
    });
  }

  initialIncomes(){
    this._incomeAppService.getAll()
    .subscribe(result => this.incomes = result);
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

  initialExchangeParties(){
    this._treasuryActionAppService.getExchangeParties()
    .subscribe(result => this.exchangeParties = result);
  }

  initialBeneficaries(){
    this._customerAppService.getTreasuryActionBeneficiaries()
    .subscribe(result => this.beneficiaries = result);
  }

  save(){
    this.saving = true;
    this._treasuryActionAppService
      .create(this.treasuryAction)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.treasuryAction = new TreasuryActionDto();
      });
  }

  onActionTypeChange(args: any){
    
    let id = args.itemData.id;
    this.mainAccounts = [];
    if(id == 0){
      this.mainAccounts = this.mainAccountsExpense;
    }else{
      this.mainAccounts = this.mainAccountsIncome;
    }

    //change balance
    if(this.treasuryAction.currencyId != undefined){
      if(this.treasuryAction.mainAccountClientId != undefined && this.treasuryAction.mainAccount == 0){
        this.getBalanceByClient(this.treasuryAction.mainAccountClientId, this.treasuryAction.currencyId);

      }else if(this.treasuryAction.mainAccountCompanyId != undefined && this.treasuryAction.mainAccount == 1){
        this.getBalanceByClient(this.treasuryAction.mainAccountCompanyId, this.treasuryAction.currencyId);
      }
    }
  }

  onMainActionChange(args:any){
    if(args.itemData != undefined){
      this.treasuryAction.mainAccountClientId = undefined;
      this.treasuryAction.mainAccountCompanyId = undefined;
      this.treasuryAction.incomeId = undefined;
      this.treasuryAction.expenseId = undefined;
      this.treasuryAction.incomeTransferDetailId = undefined;

      let id = args.itemData.id;
      switch (id) {
        case 0:
          this.initialClients();
          break;
        case 1:
          this.initialCompanies();
          break;
        case 2:
          this.initialIncomes();
          break;
        case 3:
          this.initialExpenses();
          break;
        case 4:
          this.initialBeneficaries();
          break;
        default:
          break;
      }
    }
  }

  onExchangePartyChange(args: any){
    if(args.itemData != undefined){
      this.treasuryAction.exchangePartyClientId = undefined;
      this.treasuryAction.exchangePartyCompanyId = undefined;
      this.treasuryAction.treasuryId = undefined;
      if(args.itemData.group == "Client"){
        this.treasuryAction.exchangePartyClientId = args.itemData.id;
      }else if(args.itemData.group == "Company"){
        this.treasuryAction.exchangePartyCompanyId = args.itemData.id;
      }else{
        this.treasuryAction.treasuryId = args.itemData.id;
      }
    }
  }

  onClientChange(args: any){
    if(args.itemData != undefined && 
      args.itemData.id != undefined && 
      this.treasuryAction.currencyId != undefined){
        this.getBalanceByClient(args.itemData.id, this.treasuryAction.currencyId);
    }
  }

  onCompanyChange(args: any){
    if(args.itemData != undefined && 
      args.itemData.id != undefined && 
      this.treasuryAction.currencyId != undefined){
        this.getBalanceByCompany(args.itemData.id, this.treasuryAction.currencyId);
    }
  }

  onAmountChange(args: any){
    if(args != undefined && this.treasuryAction.currencyId != undefined){
      if(this.treasuryAction.mainAccount == 0 && this.treasuryAction.mainAccountClientId != undefined)
          this.getBalanceByClient(this.treasuryAction.mainAccountClientId, this.treasuryAction.currencyId);

        if(this.treasuryAction.mainAccount == 1 && this.treasuryAction.mainAccountCompanyId != undefined)
          this.getBalanceByCompany(this.treasuryAction.mainAccountCompanyId, this.treasuryAction.currencyId);
    }
  }

  onCurrencyChange(args: any){
    if(args.itemData != undefined && 
      args.itemData.id != undefined){
        if(this.treasuryAction.mainAccount == 0 && this.treasuryAction.mainAccountClientId != undefined)
          this.getBalanceByClient(this.treasuryAction.mainAccountClientId, args.itemData.id);

        if(this.treasuryAction.mainAccount == 1 && this.treasuryAction.mainAccountCompanyId != undefined)
          this.getBalanceByCompany(this.treasuryAction.mainAccountCompanyId, args.itemData.id);
      } 
  }

  getBalanceByClient(clientId, currencyId){
    this._clientAppService.getCurrentBalance(clientId, currencyId)
    .subscribe(result => {
      this.previousBalance = result.balance;
      if(this.treasuryAction.actionType == 0){  //صرف
        this.currentBalance = this.treasuryAction.amount != undefined ? (result.balance + this.treasuryAction.amount) : result.balance;
      }else{  //قبض
        this.currentBalance = this.treasuryAction.amount != undefined ? (result.balance - this.treasuryAction.amount) : result.balance;
      }
    });
  }

  getBalanceByCompany(companyId, currencyId){
    this._companyAppService.getCurrentBalance(companyId, currencyId)
    .subscribe(result => {
      this.previousBalance = result.balance;
      if(this.treasuryAction.actionType == 0){  //صرف
        this.currentBalance = this.treasuryAction.amount != undefined ? (result.balance + this.treasuryAction.amount) : result.balance;
      }else{  //قبض
        this.currentBalance = this.treasuryAction.amount != undefined ? (result.balance - this.treasuryAction.amount) : result.balance;
      }
      
    });
  }

  getBalanceWithCurrency(number){
    if(this.treasuryAction.currencyId != undefined){
      let currency = this.currencies.find(x => x.id == this.treasuryAction.currencyId);
      if(currency != undefined){
        let selectedCurrency = this.currencies.find( c => c.id == currency.id);
        return this.getBalance(number) + '  ' + selectedCurrency.name;
      }
  
        return this.getBalance(number);
    }
  }

}
