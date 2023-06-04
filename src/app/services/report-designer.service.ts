import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemBasic, viewBuilder_ReportJSON, viewBuilder_View_Builder_GroupBy, viewBuilder_View_Field_Values, viewBuilder_Where_Selector } from '../interfaces/reports';

@Injectable({
  providedIn: 'root'
})
export class ReportDesignerService {

  fieldListSelection: viewBuilder_View_Field_Values[] | undefined;
  report = {} as viewBuilder_ReportJSON
  private _report      = new BehaviorSubject<viewBuilder_ReportJSON>(this.report);
  public  report$      = this._report.asObservable();

  fieldsList = [] as viewBuilder_View_Field_Values[] ;
  private _fieldsList      = new BehaviorSubject<viewBuilder_View_Field_Values[]>(this.fieldsList);
  public  fieldsList$      = this._fieldsList.asObservable();

  constructor() { }

  updateReport(item: viewBuilder_ReportJSON) {
    this.report = item;
    this._report.next(item)
  }

  updateFieldsList(item: viewBuilder_View_Field_Values[]) {
    this.fieldsList = item;
    this._fieldsList.next(item)
  }


  loadExampleData() {
    this.fieldListSelection = this.getExampleFieldList()
    this.updateFieldsList(this.fieldListSelection)
    this.report = {} as  viewBuilder_ReportJSON;
    this.report.name = "Example Report";
    this.report.description = "Example fields properties to understand the report";
    this.report.fields = this.getExampleFields();
    this.report.groups = this.getGroupByFields();
    return this.report;
  }

  getGroupByFields() {
    const items = [] as viewBuilder_View_Builder_GroupBy[];
    let item = {} as viewBuilder_View_Builder_GroupBy;
    item.id   = 1
    item.name = 'itemTotal';
    items.push(item)
    return items ;
  }

  getExampleFields() {
    const items = [] as viewBuilder_View_Field_Values[]

    let item = {} as viewBuilder_View_Field_Values;
    item.fieldTypeAggregate = 'SUM';
    item.name = 'itemTotal';
    item.type = 'double';
    item.id   = 1
    items.push(item)

    item = {} as viewBuilder_View_Field_Values;
    item.fieldTypeAggregate = '';
    item.name = 'name';
    item.type = 'text';
    item.id   = 2

    items.push(item)

    item = {} as viewBuilder_View_Field_Values;
    item.fieldTypeAggregate = 'SUM';
    item.name = 'taxTotal1';
    item.type = 'double';
    item.id   = 3

    items.push(item)



    return items;
  }

  getExampleFieldList() {
    const items = [] as viewBuilder_View_Field_Values[]

    let item = {} as viewBuilder_View_Field_Values;
    item.fieldTypeAggregate = '';
    item.name = 'itemTotal';
    item.type = 'double';
    item.id   = 1

    items.push(item)

    item = {} as viewBuilder_View_Field_Values;
    item.fieldTypeAggregate = '';
    item.name = 'name';
    item.type = 'text';
    item.id   = 2

    items.push(item)

    item = {} as viewBuilder_View_Field_Values;
    item.fieldTypeAggregate = 'sum';
    item.name = 'taxTotal1';
    item.type = 'double';
    item.id   = 3

    items.push(item)

    item = {} as viewBuilder_View_Field_Values;
    item.fieldTypeAggregate = 'sum';
    item.name = 'taxTotal2';
    item.type = 'double';
    item.id   = 4

    items.push(item)

    item = {} as viewBuilder_View_Field_Values;
    item.fieldTypeAggregate = 'sum';
    item.name = 'taxTotal3';
    item.type = 'double';
    item.id   = 5

    items.push(item)


    item = {} as viewBuilder_View_Field_Values;
    item.fieldTypeAggregate = '';
    item.name = 'category';
    item.type = 'nvarchar(255)';
    item.id   = 6

    items.push(item)

    item = {} as viewBuilder_View_Field_Values;
    item.fieldTypeAggregate = '';
    item.name = 'department';
    item.type = 'nvarchar(255)';
    item.id   = 7

    items.push(item)

    item = {} as viewBuilder_View_Field_Values;
    item.fieldTypeAggregate = '';
    item.name = 'CompletionDate';
    item.type = 'DateTime';
    item.id   = 7

    items.push(item)

    item = {} as viewBuilder_View_Field_Values;
    item.fieldTypeAggregate = '';
    item.name = 'OrderDate';
    item.type = 'DateTime';
    item.id   = 7

    items.push(item)

    return items;
  }

  getWhereString(where: viewBuilder_Where_Selector[], args: any[]) {
    let whereClause = []
    let i = 0
    if (!where) { return ''}
    for(let i=0; i< 10; i++){
      const whereStatements = where.filter(conditionFilter => { return conditionFilter.andOrGroupNumber == i})
      const item  =  this.getWhereGroup(i, whereStatements, args)
      whereClause.push(item)
    }
    let result = ''
    whereClause.forEach(data => {
      result = result + data
    })
    return `Where ${result}`;
  }

  getWhereGroup(groupID: number, where: viewBuilder_Where_Selector[], args: any[]) {
    if (!where || where.length == 0){return ''}

    const whereList = where.filter(data => { return data.andOrGroup == groupID.toString() })
    let whereClause = ''
    let i = 0
    let lastGroupValue = ''
    where.forEach(item =>{
      let conditions = {} as unknown[] as ItemBasic[];

      conditions = args.filter(conditionFilter => { return item.id == conditionFilter.index}) as unknown as ItemBasic[];
      let condition = args[0]
      if (condition) {
      } else {
        console.log('whereType', item.whereType)
        condition = {} as ItemBasic
        if (item.whereType.toLowerCase() === 'between') {
          condition.value = 'StartDate and EndDate'
        } else {
          condition.value = `${item.whereType} value`
        }
      }

      lastGroupValue = ''
      if (item.andOrGroup) {
        lastGroupValue = item.andOrGroup
      }

      whereClause =  ` ${item.name} ${item.whereType} ${condition.value} ${item.andOr}`
      i += 1
    })

    return `( ${whereClause} ) ${lastGroupValue} `
  }

}

// fields: viewBuilder_View_Field_Values[];
// where:  viewBuilder_Where_Selector[];
// groups: viewBuilder_View_Builder_GroupBy[];
// orderBy: viewBuilder_View_Field_Values[];
