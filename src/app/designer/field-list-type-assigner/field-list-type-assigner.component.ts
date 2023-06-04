import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { viewBuilder_View_Field_Values, aggregateFunctions, viewBuilder_ReportJSON } from 'src/app/interfaces/reports';
import { ReportDesignerService } from 'src/app/services/report-designer.service';

@Component({
  selector: 'pgReporting-field-list-type-assigner',
  templateUrl: './field-list-type-assigner.component.html',
  styleUrls: ['./field-list-type-assigner.component.scss']
})
export class FieldListTypeAssignerComponent implements OnInit {

  aggregateFunction: unknown;
  itemSelected = {} as viewBuilder_View_Field_Values;
  fields = [] as viewBuilder_View_Field_Values[];
  _fieldsList = this.reportDesignerService.fieldsList$.subscribe(data =>{
    this.fields = data;
  })

  _report = this.reportDesignerService.report$.subscribe(data => {
    this.fields = data.fields;
  })

  aggregates = aggregateFunctions;

  formFieldAggregate: UntypedFormGroup | undefined;

  constructor(
    private reportDesignerService: ReportDesignerService,
    private fb: UntypedFormBuilder) { }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    if (this._report) {
      this._report.unsubscribe()
    }
  }

  changeSelection() {
    // this.outPutID.emit(this.id)
  }

  setItem(event: any) {
    // console.log('setItemType', event)
    const item = this.aggregates.filter(item => {
      return item.name === event;
    })
    this.aggregateFunction  = item[0];
    console.log('aggregateFunction', this.aggregateFunction, event)
    this.itemSelected.fieldTypeAggregate = event;
    if (this.formFieldAggregate) {
      this.formFieldAggregate.patchValue(this.itemSelected)
    }
  }

  initForm(item: viewBuilder_View_Field_Values) {

    console.log('item initForm', item)
    if (!item) { return }
    this.formFieldAggregate = this.fb.group({
      id: [],
      type: [],
      name: [],
      fieldTypeAggregate: [],
    })

    this.itemSelected = item;

    const aggregate =  this.aggregates.filter( data =>
      { return data.name.toUpperCase() === item.fieldTypeAggregate.toUpperCase() })

    this.aggregateFunction  = aggregate[0]
    item.fieldTypeAggregate = item.fieldTypeAggregate.toUpperCase()
    console.log('item', item)
    this.formFieldAggregate.patchValue(item)

  }

  saveItem(){
    if (this.formFieldAggregate?.value) {
      const item = this.formFieldAggregate.value as viewBuilder_View_Field_Values
      this.fields = this.removeItemById(this.fields, item.id);
      this.fields.push(item)
    }
  }

  removeItemById(array: viewBuilder_View_Field_Values[], id: number): viewBuilder_View_Field_Values[] {
    return array.filter(item => item.id !== id);
  }

}
