import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemBasic, viewBuilderList, viewBuilder_ReportJSON, viewBuilder_View_Builder_GroupBy, viewBuilder_View_Field_Values, viewBuilder_Where_Selector } from '../interfaces/reports';
import { UUID } from 'angular2-uuid';
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
    this.report.viewBuilder_viewListID = 1;
    this.report.description = "Example fields properties to understand the report";
    this.report.fields = this.getExampleFields();
    this.report.groups = this.getGroupByFields();
    this.report.where = this.getWhereExampleList();
    return this.report;
  }

  getGroupByFields() {
    const items = [] as viewBuilder_View_Builder_GroupBy[];
    let item = {} as viewBuilder_View_Builder_GroupBy;
    item.id   = UUID.UUID();
    item.name = 'name';
    items.push(item)
    return items ;
  }

  getExampleFields() {
    const items = [] as viewBuilder_View_Field_Values[]

    let item = {} as viewBuilder_View_Field_Values;
    item.fieldTypeAggregate = 'SUM';
    item.name = 'itemTotal';
    item.type = 'double';
    item.id   = UUID.UUID();
    items.push(item)

    item = {} as viewBuilder_View_Field_Values;
    item.fieldTypeAggregate = '';
    item.name = 'name';
    item.type = 'text';
    item.id   = UUID.UUID();

    items.push(item)

    item = {} as viewBuilder_View_Field_Values;
    item.fieldTypeAggregate = 'SUM';
    item.name = 'taxTotal1';
    item.type = 'double';
    item.id   = UUID.UUID();

    items.push(item)

    return items;

  }
  getWhereExampleList() {
    const items = []  as viewBuilder_Where_Selector[];

    let item = {} as viewBuilder_Where_Selector;
    item.id = UUID.UUID()
    item.name = 'CompletionDate'
    item.whereType = 'Between'
    item.whereCondition = "'01/01/2023 and 02/01/2023'";
    item.andOr = ''
    item.andOrGroupNumber = 1
    item.andOrGroup = 'AND'
    items.push(item)

    item = {} as viewBuilder_Where_Selector
    item.id = UUID.UUID()
    item.name = 'category'
    item.whereType = '='
    item.whereCondition = "'Blazer'";
    item.andOr = 'OR'
    item.andOrGroupNumber = 2
    item.andOrGroup = ''

    items.push(item)

    item = {} as viewBuilder_Where_Selector
    item.id = UUID.UUID()
    item.name = 'category'
    item.whereType = '='
    item.whereCondition = "'Top Hat'";
    item.andOr = ''
    item.andOrGroupNumber = 2
    item.andOrGroup = ''

    items.push(item)
    return items;

  }
  getExampleFieldList() {
    const items = [] as viewBuilder_View_Field_Values[]

    let item = {} as viewBuilder_View_Field_Values;
    item.fieldTypeAggregate = '';
    item.name = 'itemTotal';
    item.type = 'double';
    item.id   = UUID.UUID();

    items.push(item)

    item = {} as viewBuilder_View_Field_Values;
    item.fieldTypeAggregate = '';
    item.name = 'name';
    item.type = 'text';
    item.id   = UUID.UUID();

    items.push(item)

    item = {} as viewBuilder_View_Field_Values;
    item.fieldTypeAggregate = 'sum';
    item.name = 'taxTotal1';
    item.type = 'double';
    item.id   = UUID.UUID();

    items.push(item)

    item = {} as viewBuilder_View_Field_Values;
    item.fieldTypeAggregate = 'sum';
    item.name = 'taxTotal2';
    item.type = 'double';
    item.id   = UUID.UUID();

    items.push(item)

    item = {} as viewBuilder_View_Field_Values;
    item.fieldTypeAggregate = 'sum';
    item.name = 'taxTotal3';
    item.type = 'double';
    item.id   = UUID.UUID();

    items.push(item)


    item = {} as viewBuilder_View_Field_Values;
    item.fieldTypeAggregate = '';
    item.name = 'category';
    item.type = 'nvarchar(255)';
    item.id   = UUID.UUID();

    items.push(item)

    item = {} as viewBuilder_View_Field_Values;
    item.fieldTypeAggregate = '';
    item.name = 'department';
    item.type = 'nvarchar(255)';
    item.id   = UUID.UUID();

    items.push(item)

    item = {} as viewBuilder_View_Field_Values;
    item.fieldTypeAggregate = '';
    item.name = 'CompletionDate';
    item.type = 'DateTime';
    item.id   = UUID.UUID();

    items.push(item)

    item = {} as viewBuilder_View_Field_Values;
    item.fieldTypeAggregate = '';
    item.name = 'OrderDate';
    item.type = 'DateTime';
    item.id   = UUID.UUID();

    items.push(item)

    return items;
  }


  getSQLStatement(args: any[] ) {
    let sql
    const viewList = viewBuilderList
    if (!this.report || !this.report.viewBuilder_viewListID) {
      console.log('no view selected', this.report)
      return;
    }

    const view = viewList.filter(data => {
      return data.id == this.report.viewBuilder_viewListID
    })

    const where = this.getWhereString(this.report.where, args)
    const groupBy = this.getGroupBy();
    const orderBy = this.getOrderBy()
    sql = `${this.getSelect()} FROM ${view[0].viewNameValue} ${where} ${groupBy} ${orderBy}`
    console.log('sql', sql)
    return sql
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
        // console.log('whereType', item.whereType)
        condition = {} as ItemBasic
        if (item.whereType.toLowerCase() === 'between') {
          condition.value = "'01/01/2023' AND '01/02/2023'"
        } else {
          if (item.whereCondition) {
            condition.value = `${item.whereCondition}`
          } else {
            condition.value = `example value`
          }
        }
      }

      lastGroupValue = ''
      if (item.andOrGroup) {
        lastGroupValue = item.andOrGroup
      }

      whereClause =  `${whereClause} ${item.name} ${item.whereType} ${condition.value} ${item.andOr}`
      i += 1
    })

    return `( ${whereClause} ) ${lastGroupValue} `
  }

  getOrderBy() {
    if (this.report && this.report.orderBy) {
      return `ORDER BY ${this.getFieldList(this.report.orderBy)}`
    }
    return ''
  }

  getGroupBy() {
    if (this.report && this.report.groups) {
      return `GROUP BY ${this.getFieldList(this.report.groups)}`
    }
    return ''
  }

  getSelect() {
    if (this.report && this.report.fields) {
      return `SELECT ${this.getFieldList(this.report.fields)}`
    }
    return ''
  }

  getFieldList(list: any[]) {
    let item : string = ''
    list.forEach(data => {
      item = `${item} ${data.name},`
    })
    if (item && item != '') {
      item  = item.slice(0,item.length-1)
    }
    return item;
  }

}

// fields: viewBuilder_View_Field_Values[];
// where:  viewBuilder_Where_Selector[];
// groups: viewBuilder_View_Builder_GroupBy[];
// orderBy: viewBuilder_View_Field_Values[];
