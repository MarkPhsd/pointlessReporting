import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignerListComponent } from './designer/designer-list/designer-list.component';
import { DesignerEditorComponent } from './designer/designer-editor/designer-editor.component';
import { ChartsComponent } from './reports/charts/charts.component';
import { ReportDataComponent } from './reports/report-data/report-data.component';

const routes: Routes = [

  { path: 'reports', component: DesignerListComponent, title:'Reports Manager',  data: { animation: 'isLeft'} },
  { path: 'report-editor', component:   DesignerEditorComponent, title:'Reports Editor', data: { animation: 'isLeft'} },
  { path: 'chart-view'  , component: ChartsComponent, title:'Chart View', data: { animation: 'isLeft'} },
  { path: 'report-view'  , component: ReportDataComponent, title:'Report View', data: { animation: 'isLeft'} },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
