import {  Component, EventEmitter, Inject, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GridApi, Optional } from 'ag-grid-community';
import { UUID } from 'angular2-uuid';
import { viewBuilder_ReportJSON } from 'src/app/interfaces/reports';
import { ReportDesignerService } from 'src/app/services/report-designer.service';
import { ButtonRendererComponent } from 'src/app/widgets/button-renderer/button-renderer.component';

@Component({
  selector: 'psReporting-designer-list',
  templateUrl: './designer-list.component.html',
  styleUrls: ['./designer-list.component.scss']
})
export class DesignerListComponent  {

  // get isGridView() {
  //   if (this.viewGrid) {

  viewGrid: boolean = false

  @ViewChild('gridView') gridView: TemplateRef<any> | undefined;
  @Input() dataInterface: string = ''
  @Input() data        = [] as any[];
  @Output() delete = new EventEmitter();
  @Output() add    = new EventEmitter();
  selectedReport: viewBuilder_ReportJSON | undefined;
  params               : any;
  private gridApi      = {} as GridApi
  get gridAPI(): GridApi | undefined {  return this.gridApi;  }

  columnDefs = [] as any[];
  frameworkComponents:   any;
  defaultColDef = {
    flex: 1,
    minWidth: 100,
  };

  gridOptions = {
    defaultColDef: {
      sortable: true,
      filter: 'agTextColumnFilter',
      resizable: true,
    },

    columnDefs: this.columnDefs,
    enableSorting: true,
    enableFilter: true,
    pagination: false,
  } as any;

  configureColumns() {
    let colDefs = [] as any[]
    let item = {} as any;

    item = {
      headerName: 'Edit',
      field: "id",
      cellRenderer: ButtonRendererComponent,
      cellRendererParams: {
        onClick: this.editFromGrid.bind(this),
        label: 'Edit',
        getLabelFunction: this.getLabel.bind(this),
        btnClass: ''
      },
      width   : 125,
      minWidth: 125,
      maxWidth: 125
    }
    colDefs.push(item)

    // item = {
    //   field: 'athlete',
    //   cellRenderer: BtnCellRenderer,
    //   cellRendererParams: {
    //     clicked: function (field: any) {
    //       alert(`${field} was clicked`);
    //     },
    //   },
    //   minWidth: 150,
    // }
    // colDefs.push(item)

    item = {}  as any;
    item = {headerName: 'Name',field: 'name',
          sortable: true,
          width   : 175,
          minWidth: 175,
          maxWidth: 275,
          flex    : 1,
    } as any;
    colDefs.push(item)

    item = {} as any;
    item =   {headerName: 'Description',field: 'description',
          sortable: true,
          width   : 375,
          minWidth: 375,
          maxWidth: 375,
          flex    : 1,
          cellStyle: {'white-space': 'normal'},
    } as any;
    colDefs.push(item)

    this.columnDefs = colDefs;

  }

  initGridResults() {
    this.configureColumns()
    this.frameworkComponents = {
      btnCellRenderer: ButtonRendererComponent
    };
  }

  constructor(
    private matSnack : MatSnackBar,
    private router: Router,
    private reportDesignerService: ReportDesignerService,
    @Optional() private dialogRef: MatDialogRef<DesignerListComponent>,
    @Inject(MAT_DIALOG_DATA) public gridData: any,

    ) {

    if (gridData) {
      this.data = gridData.data;
      this.dataInterface = gridData.name
      this.viewGrid = true
    }

    if (!gridData || !gridData.data) {
      this.data = [] as any
      this.data.push(this.reportDesignerService.loadExampleData()) // this.loadExampleReport();
      this.viewGrid = true
    }
    this.configureColumns()
  }

  refreshReport() {

  }

  ngAfterViewInit(): void {

  }

  onGridReady(params: any) {
    if (params)  {
      this.params  = params
      this.gridApi = params.api;
      params.api.sizeColumnsToFit();
      params.api.resetRowHeights();
    }
    if (this.data) {

      // this.dynamicallyConfigureColumnsFromObject(this.data)
    }
  }

  onExportToCsv() {
    if (this.gridAPI == undefined) { return }
    this.gridApi.exportDataAsCsv();
  }

  loadExample() {

  }

  get isGridView() {
    if (this.viewGrid) {
      return this.gridView;
    }
    return null
  }

  addReport() {

    const item = {} as viewBuilder_ReportJSON;
    item.name = 'New report.'
    item.description = 'Description.'
    item.id   = UUID.UUID()
    this.data.push(item)
    this.add.emit(item)
    this.gridApi.setRowData(this.data)

  }

  deleteReport() {
    if (!this.selectedReport || !this.selectedReport.id) { return }
    this.delete.emit(this.selectedReport?.id)
  }

  copyReport() {

  }

  onSelectionChange(event: any) {
    console.log(event)
  }
  loadItem(report: viewBuilder_ReportJSON) {
    console.log('load report', report)
    this.reportDesignerService.updateReport(report)
    this.router.navigate(['report-editor'])
  }

  loadExampleReport() {
    const item = this.reportDesignerService.loadExampleData()
    this.reportDesignerService.updateReport(item)
    this.router.navigate(['report-editor'])
  }

  editFromGrid(e: any) {
    console.log(e)
    if (e.rowData)  {
      const item = this.data.filter(value => {
        return value.id === e.rowData.id;
      })
      if (!item) {
        this.matSnack.open('Item not found', 'Close')
      }
      console.log('item', item)
      this.loadItem(item[0] as unknown as viewBuilder_ReportJSON);
    }
  }

  getLabel(rowData: any)
  {
    if(rowData && rowData.hasIndicator)
      return 'Edit';
      else return 'Edit';
  }


}
