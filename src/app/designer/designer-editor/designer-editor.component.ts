import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { viewBuilder_ViewList, viewBuilder_ReportJSON, viewBuilder_View_Field_Values, viewBuilder_Where_Selector, viewBuilder_View_Builder_GroupBy } from 'src/app/interfaces/reports';
import { IUser } from 'src/app/interfaces/user';
import { ReportDesignerService } from 'src/app/services/report-designer.service';

@Component({
  selector: 'psReporting-designer-editor',
  templateUrl: './designer-editor.component.html',
  styleUrls: ['./designer-editor.component.scss']
})
export class DesignerEditorComponent implements OnInit {

  @Input() User = {} as IUser;
  @Input() viewBuilder_ViewList = [] as viewBuilder_ViewList[];
  @Input() viewBuilder_ReportJSON = {} as viewBuilder_ReportJSON;

  @Input() inputForm: UntypedFormGroup | undefined;
  @Input() viewBuilder_View_Field_Values = [] as viewBuilder_View_Field_Values[];

  @Output() getViewFieldNames =  new EventEmitter();
  @Output() getReportJSON = new EventEmitter();
  @Output() getViewList =  new EventEmitter();

  _report: Subscription | undefined;


  constructor(private reportDesignerService:ReportDesignerService,
              private fb: FormBuilder, ) { }

  ngOnInit(): void {
    this._report = this.reportDesignerService.report$.subscribe(data => {
      this.viewBuilder_ReportJSON = data;
      this.initForm(this.viewBuilder_ReportJSON)
    })


  }

  initForm(item: viewBuilder_ReportJSON) {
    if (item) {
      this.inputForm = this.fb.group({
        id:[],
        name: [],
        viewBuilder_GroupsID: [],
        viewBuilder_viewListID: [],
        description: [],
        fields: [],
        where: [],
        groups: [],
        orderBy: [],
        dashBoard:[],
      })
      this.inputForm.patchValue(item)
    }
  }

  ngOnDestroy() {
    if (this._report) {
      this._report?.unsubscribe()
    }
  }

  saveSelectedFields(fields: viewBuilder_View_Field_Values[]) {
    this.viewBuilder_ReportJSON.fields = fields
    this.reportDesignerService.updateReport(this.viewBuilder_ReportJSON)
  }

  addFilter(fields: viewBuilder_Where_Selector[]) {
    this.viewBuilder_ReportJSON.where = fields
    this.reportDesignerService.updateReport(this.viewBuilder_ReportJSON)
  }

  addGroup(fields: viewBuilder_View_Builder_GroupBy[]) {
    this.viewBuilder_ReportJSON.groups = fields
    this.reportDesignerService.updateReport(this.viewBuilder_ReportJSON)
  }

  addOrderBy(fields: viewBuilder_View_Field_Values[]) {
    this.viewBuilder_ReportJSON.orderBy = fields
    this.reportDesignerService.updateReport(this.viewBuilder_ReportJSON)
  }

  getSQLStatement() {
   return this.reportDesignerService.getSQLStatement([])
  }

  save() {

  }

  delete() {

  }

  copy(){

  }

}

  // id: number;
	// name: string;
	// viewBuilder_GroupsID: number;
	// viewBuilder_viewListID: number;
	// description: string;
	// fields: viewBuilder_View_Field_Values[];
	// where:  viewBuilder_Where_Selector[];
	// groups: viewBuilder_View_Builder_GroupBy[];
	// orderBy: viewBuilder_View_Field_Values[];
