import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ItemBasic } from 'src/app/interfaces/reports';

@Component({
  selector: 'psReporting-field-type-selector',
  templateUrl: './field-type-selector.component.html',
  styleUrls: ['./field-type-selector.component.scss']
})
export class FieldTypeSelectorComponent implements OnInit {

  @Output() selectItem = new EventEmitter<any>();
  @Input() inputForm:  UntypedFormGroup | undefined;
  @Input() fieldName: string = '' ;
  @Input() list: unknown;
  //list of fields type is the type of field, number, text etc.
  selected = {} as ItemBasic[] | unknown;
  @ViewChild('formView')      formView: TemplateRef<any> | undefined;

  constructor() {}

  ngOnInit(): void {
      const i = 0;
  }

  setItem(item:any) {
    this.selectItem.emit(item)
  }
}
