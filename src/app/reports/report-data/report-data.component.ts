import { AfterViewInit, Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GridApi, Optional } from 'ag-grid-community';
// import { MenuItem } from 'electron';
// import { AgGridFormatingService } from 'src/app/_components/_aggrid/ag-grid-formating.service';
// import { ReportItemSalesOptimized } from 'src/app/_services/reporting/reporting-items-sales.service';
// import { PaymentSummary } from 'src/app/_services/reporting/sales-payments.service';

@Component({
  selector: 'app-report-data',
  templateUrl: './report-data.component.html',
  styleUrls: ['./report-data.component.scss']
})
export class ReportDataComponent implements  AfterViewInit {

  @Input() dataInterface: string | undefined;
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

    intefaceType = anObject[0]
    console.log('data', this.dataInterface, anObject, intefaceType)
    const colDefs = this.columnDefs;
    colDefs.length = 0;
    const keys = Object.keys(intefaceType);

    keys.forEach((key: any) =>{
      colDefs.push({
        field: key
      })
    });

    this.columnDefs = colDefs;
    this.gridApi.setColumnDefs(colDefs)

  }

  constructor(
    @Optional() private dialogRef: MatDialogRef<ReportDataComponent>,
    @Inject(MAT_DIALOG_DATA) public gridData: any,
    ) {
      // console.log('loaded data', gridData)
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
    this.gridApi.exportDataAsCsv();
  }

}

