import { Component, Input, OnInit } from '@angular/core';
import { viewBuilder_AggregateFunction, aggregateFunctions } from 'src/app/interfaces/reports';

@Component({
  selector: 'psReporting-report-group-selector',
  templateUrl: './report-group-selector.component.html',
  styleUrls: ['./report-group-selector.component.scss']
})
export class ReportGroupSelectorComponent implements OnInit {

  @Input()  selected = {} as viewBuilder_AggregateFunction | undefined ;

  fieldTypes = aggregateFunctions;

  constructor() {
  }

  ngOnInit(): void {
      const i = 0;
  }

}
