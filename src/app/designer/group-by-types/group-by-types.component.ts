import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { viewBuilder_View_Field_Values, viewBuilder_ReportJSON, viewBuilder_View_Builder_GroupBy, aggregateFunctions, viewBuilder_AggregateFunction } from 'src/app/interfaces/reports';
import { ReportDesignerService } from 'src/app/services/report-designer.service';

@Component({
  selector: 'psReporting-group-by-types',
  templateUrl: './group-by-types.component.html',
  styleUrls: ['./group-by-types.component.scss']
})
export class GroupByTypesComponent implements OnInit {

  @Input()  selected = {} as viewBuilder_AggregateFunction | undefined ;

  fieldTypes = aggregateFunctions;

  constructor() {
  }

  ngOnInit(): void {
      const i = 0;
  }

}
