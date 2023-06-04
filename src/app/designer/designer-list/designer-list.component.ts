import {  Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GridApi, Optional } from 'ag-grid-community';
import { ReportDesignerService } from 'src/app/services/report-designer.service';

@Component({
  selector: 'psReporting-designer-list',
  templateUrl: './designer-list.component.html',
  styleUrls: ['./designer-list.component.scss']
})
export class DesignerListComponent  {

  @Input() dataInterface: string = ''
  @Input() data        : any;
  params               : any;
  private gridApi      = {} as GridApi
  get gridAPI(): GridApi | undefined {  return this.gridApi;  }

  columnDefs = [] as any[];

  defaultColDef = {
    flex: 2,
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

  dynamicallyConfigureColumnsFromObject(anObject: any) {
    let intefaceType : any; //anObject[0] as IReportItemSales

    // console.log(dataGrid)
    if (this.dataInterface === 'ReOrderList' ||
        this.dataInterface === 'MenuItem') {
      intefaceType = anObject[0] // as MenuItem
    }

    if (this.dataInterface === 'ItemSales' ||
        this.dataInterface === 'IReportItemSales') {
          console.log(anObject[0])
      intefaceType = anObject[0] // as ReportItemSalesOptimized
    }

    if (this.dataInterface === 'SalesTax' ||
        this.dataInterface === 'ITaxReport') {
      intefaceType = anObject[0]
    }

    if (this.dataInterface === 'PaymentSummary') {
      intefaceType = anObject[0] // as PaymentSummary
    }

    const colDefs = this.columnDefs;
    colDefs.length = 0;
    const keys = Object.keys(intefaceType);

    keys.forEach((key) => colDefs.push({
      field: key
    }));

    this.columnDefs = colDefs;
    this.gridApi.setColumnDefs(colDefs)

  }

  constructor(
    private router: Router,
    private reportDesignerService: ReportDesignerService,
    @Optional() private dialogRef: MatDialogRef<DesignerListComponent>,
    @Inject(MAT_DIALOG_DATA) public gridData: any,

    ) {

      console.log('loaded data', gridData)
      if (gridData) {
        this.data = gridData.data;
        this.dataInterface = gridData.name
      }
     }

  ngAfterViewInit(): void {

  }

  onGridReady(params: any) {
    if (params)  {
      this.params  = params
      this.gridApi = params.api;
      // this.gridColumnApi = params.columnApi;
      params.api.sizeColumnsToFit();
    }
    if (this.data) {
      this.dynamicallyConfigureColumnsFromObject(this.data)
    }
  }

  onExportToCsv() {
    if (this.gridAPI == undefined) { return }
    this.gridApi.exportDataAsCsv();
  }

  loadExample() {

  }

  addReport() {

  }

  deleteReport() {

  }

  copyReport() {

  }

  loadExampleReport() {
    const item = this.reportDesignerService.loadExampleData()
    this.reportDesignerService.updateReport(item)
    this.router.navigate(['report-editor'])
  }
}
