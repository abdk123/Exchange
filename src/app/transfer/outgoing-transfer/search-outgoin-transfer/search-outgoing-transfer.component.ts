import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { LocalizationHelper } from '@shared/localization/localization-helper';
import { L10n, setCulture, loadCldr } from '@syncfusion/ej2-base';

setCulture('ar-SY');
L10n.load(LocalizationHelper.getArabicResources());

@Component({
  selector: 'app-search-outgoing-transfer',
  templateUrl: './search-outgoing-transfer.component.html',
  styleUrls: ['./search-outgoing-transfer.component.scss']
})
export class SearchOutgoingTransferComponent extends AppComponentBase implements OnInit {

  fromDate:Date;
  toDate:Date;

  paymentTypes: object[] = [];
  
  public fields: Object = { text: 'name', value: 'id' };
  constructor(
    injector: Injector,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
    ) { 
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
    this.paymentTypes = [
      {'name' : 'نقدي' , 'id' : 0},
      {'name' : 'ذمم' , 'id' : 1},
      {'name' : 'شركة' , 'id' : 2},
    ];

  }

  search(){

  }

}
