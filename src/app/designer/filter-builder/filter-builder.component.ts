import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { viewBuilder_View_Field_Values, whereTypeList, ItemBasic, viewBuilder_ReportJSON, viewBuilder_Where_Selector } from 'src/app/interfaces/reports';
import { ReportDesignerService } from 'src/app/services/report-designer.service';
import { UUID } from 'angular2-uuid';
@Component({
  selector: 'pgReporting-filter-builder',
  templateUrl: './filter-builder.component.html',
  styleUrls: ['./filter-builder.component.scss']
})
export class FilterBuilderComponent implements OnInit {
  whereForm: UntypedFormGroup | undefined;
 //  @Input() viewBuilder_View_Field_Values = [] as viewBuilder_View_Field_Values[];
  @Input() allFields = [] as viewBuilder_View_Field_Values[];
  _report: Subscription | undefined;
  _fieldList: Subscription | undefined;

  report = {} as viewBuilder_ReportJSON

  andOrList = [
    {id: 1, name: 'and'},
    {id: 2, name: 'or'}
  ]

  whereSelector = whereTypeList;
    //  @Output() onCopy: EventEmitter<EventObj<ClipboardEvent>> = new EventEmitter();
  @Output() addFilter: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private reportDesignerService: ReportDesignerService,
    private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this._fieldList = this.reportDesignerService.fieldsList$.subscribe(data =>{
      this.allFields = data;
    })

    this.initWhereForm()
  }

  editSelection(item: viewBuilder_Where_Selector) {
    this.whereForm?.patchValue(item)
  }

  initWhereForm() {
    this.whereForm = this.fb.group({
      id: [UUID.UUID()],
      name:[],
      whereType: [],
      whereCondition: [],
      andOr: [],
      andOrGroupNumber: [],
      andOrGroup: [],
    })
  }

  setWhereFieldValue(event: unknown) {
    if (!event) { return }
    const where = event as ItemBasic
    this.whereForm?.controls['field'].setValue(where?.name)
  }

  addWhereCondition() {
    console.log('form value', this.whereForm?.value)
    if (!this.whereForm) { return }
    const item = this.whereForm.value as viewBuilder_Where_Selector;
    if (!this.report.where) {
      this.report.where = []
    }
    this.report.where.push(item)
    this.reportDesignerService.updateReport(this.report)
    //add where condition to JSON - do push. //also remove the same condition if the field exists.
  }

  getWhereConditions() {
    const item =  this.reportDesignerService.getWhereString(this.report.where, [])

    // console.log(item)
    return item
  }

}
