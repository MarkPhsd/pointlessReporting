import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { chartTypeCollection } from 'src/app/interfaces/reports';

@Component({
  selector: 'psReporting-report-types',
  templateUrl: './report-types.component.html',
  styleUrls: ['./report-types.component.scss']
})
export class ReportTypesComponent implements OnInit {

  @Input() inputForm: UntypedFormGroup | undefined;
  @Input() fieldName: string = 'reoortTypes'
  @Input() hideClear: boolean  = false;
  @ViewChild('formView')      formView: TemplateRef<any> | undefined;

  chartType = chartTypeCollection;

  @Output() outputItem = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  get isFormView() {
    if (this.inputForm) {
      return this.formView
    }
    return null;
  }

  setItem(item:any) {
    console.log('item output', item)
    this.outputItem.emit(item)
  }
}

