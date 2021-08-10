import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { LocalizationHelper } from '@shared/localization/localization-helper';
import { ClientDto, ClientServiceProxy, CompanyDto, CompanyServiceProxy, CountryDto, CountryServiceProxy, CurrencyDto, CurrencyServiceProxy, ExpenseDto, ExpenseServiceProxy, IncomeDto, IncomeServiceProxy } from '@shared/service-proxies/service-proxies';
import { L10n, setCulture, loadCldr  } from '@syncfusion/ej2-base';

setCulture('ar-SY');
L10n.load(LocalizationHelper.getArabicResources());
declare var require: any;

@Component({
  selector: 'app-treasury-action',
  templateUrl: './treasury-action.component.html',
  styleUrls: ['./treasury-action.component.scss']
})
export class TreasuryActionComponent  extends AppComponentBase implements OnInit {

  date: Date ;
  currency: CurrencyDto = new CurrencyDto();
  toCompany: CompanyDto = new CompanyDto();
  fromCompany: CompanyDto = new CompanyDto();
  fromClient: ClientDto = new ClientDto();
  country: CountryDto = new CountryDto();
  balance: number;
  paymentType: any;
  actionType: any;
  beneficiary: any;
  sender: any;
  destination: any;
  mainAccount: any;
  expense: ExpenseDto = new ExpenseDto();
  income: IncomeDto = new IncomeDto();
  note: string;
  instrumentNo: number;
  amount: number;
  commission: number;
  companyCommission: number;
  receivedAmount:number;
  identificationNumber: string;
  issuer: string;

  currencies: CurrencyDto[] = [];
  companies: CompanyDto[] = [];
  countries: CountryDto[] = [];
  clients: ClientDto[] = [];
  expenses: ExpenseDto[] = [];
  incomes: IncomeDto[] = [];
  customers: any;
  alEexchangeParties: object[] = [];
  paymentTypes: object[] = [];
  actionTypes: object[] = [];
  mainAccounts: object[] = [];
  mainAccountsIncome: object[] = [];
  mainAccountsExpense: object[] = [];


  public fields: Object = { text: 'name', value: 'id' };

  constructor(
    injector: Injector,
    private _currencyAppService: CurrencyServiceProxy,
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
      require('cldr-data/supplemental/weekdata.json') // To load the culture based first day of week
    );
  }

  ngOnInit(): void {
    this.initialExpenses();
    this.initialIncomes();
    this.initialCurrencies();
    this.initialCompanies();
    this.initialCountries();
    this.initialClients();
    this.initialExchangeParties();
    
    this.paymentTypes = [
      {'name' : 'نقدي' , 'id' : 0},
      {'name' : 'ذمم' , 'id' : 1},
      {'name' : 'شركة' , 'id' : 2},
    ];

    this.actionTypes = [
      {'name' : 'صرف' , 'id' : 0},
      {'name' : 'قبض' , 'id' : 1}
    ];

    this.paymentType = {'name' : 'نقدي' , 'id' : 0};
    this.actionType = {'name' : 'صرف' , 'id' : 0};
    this.mainAccount = {'name' : 'ذمم عملاء' , 'id' : 0};

    this.customers = [
      {'name' : 'محمد' , 'id' : 1 , 'phoneNumber' : '' , 'Address' : ''},
      {'name' : 'علي' , 'id' : 2 , 'phoneNumber' : '' , 'Address' : ''},
    ];

    this.beneficiary = {'name' : 'محمد' , 'id' : 1 , 'phoneNumber' : '' , 'Address' : ''};
    this.sender = {'name' : 'علي' , 'id' : 2 , 'phoneNumber' : '' , 'Address' : ''};

    this.initialMainAccounts();
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

    if(this.actionType.id == 0){
      this.mainAccounts = this.mainAccountsExpense;
    }else{
      this.mainAccounts = this.mainAccountsIncome;
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
    this.companies.forEach(item => {
      this.alEexchangeParties.push({'id':item.id,'name':item.name,'group':'شركة'});
    });

    // this.clients.forEach(item => {
    //   this.alEexchangeParties.push({'id':item.id,'name':item.name,'group':'عميل'});
    // });

    // this.customers.forEach(item => {
    //   this.alEexchangeParties.push({'id':item.id,'name':item.name,'group':' '});
    // });
  }

  save(){

  }

  onChangeActionType(args: any){
    let id = args.itemData.id;
    this.mainAccounts = [];
    if(id == 0){
      this.mainAccounts = this.mainAccountsExpense;
    }else{
      this.mainAccounts = this.mainAccountsIncome;
    }
  }

  getAmountWithCurrency(number){
    if(this.currency.id != undefined){
      let selectedCurrency = this.currencies.find( c => c.id == this.currency.id);
      return this.numberWithCommas(number) + '  ' + selectedCurrency.name;
    }
      

      return this.numberWithCommas(number);
  }

}