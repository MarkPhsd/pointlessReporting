import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportGroupSelectorComponent } from './designer/report-group-selector/report-group-selector.component';
import { ReportSelectorComponent } from './designer/report-selector/report-selector.component';
import { AndOrSelectorComponent } from './designer/and-or-selector/and-or-selector.component';
import { SortSelectorComponent } from './designer/sort-selector/sort-selector.component';
import { AggregateSelectorComponent } from './designer/aggregate-selector/aggregate-selector.component';
import { FieldTypeSelectorComponent } from './designer/field-type-selector/field-type-selector.component';
import { FieldSelectorComponent } from './designer/field-selector/field-selector.component';
import { GroupByTypesComponent } from './designer/group-by-types/group-by-types.component';
import { ReportTypesComponent } from './designer/report-types/report-types.component';
import { ChartsComponent } from './reports/charts/charts.component';
import { ReportDataComponent } from './reports/report-data/report-data.component';
import { DesignerEditorComponent } from './designer/designer-editor/designer-editor.component';
import { DesignerListComponent } from './designer/designer-list/designer-list.component';
import { EditBarComponent } from './widgets/edit-bar/edit-bar.component';
import { AppMaterialModule } from './material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { MatSelectorComponent } from './widgets/mat-selector/mat-selector.component';
import { ArrayFilterPipe } from './pipes/array-filter.pipe';
import { FilterBuilderComponent } from './designer/filter-builder/filter-builder.component';
import { FieldValueSelectorComponent } from './designer/field-value-selector/field-value-selector.component';
import { FieldListTypeAssignerComponent } from './designer/field-list-type-assigner/field-list-type-assigner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    ReportGroupSelectorComponent,
    ReportSelectorComponent,
    AndOrSelectorComponent,
    SortSelectorComponent,
    AggregateSelectorComponent,
    FieldTypeSelectorComponent,
    FieldSelectorComponent,
    GroupByTypesComponent,
    ReportTypesComponent,
    ChartsComponent,
    ReportDataComponent,
    DesignerEditorComponent,
    DesignerListComponent,
    EditBarComponent,
    MatSelectorComponent,
    ArrayFilterPipe,
    FilterBuilderComponent,
    FieldValueSelectorComponent,
    FieldListTypeAssignerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AgGridModule,
    AppRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
