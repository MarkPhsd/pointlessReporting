import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ItemBasic } from 'src/app/interfaces/reports';

@Component({
  selector: 'pgReporting-field-value-selector',
  templateUrl: './field-value-selector.component.html',
  styleUrls: ['./field-value-selector.component.scss']
})
export class FieldValueSelectorComponent implements OnInit {

  @Output() outputItem = new EventEmitter<any>();
  @Input() inputForm: UntypedFormGroup | undefined;
  @Input() fieldName: string = '';
  @Input() list: ItemBasic[] | unknown;
  constructor() { }

  ngOnInit(): void {
  }

  setItem(item:any) {
    console.log('item output', item)
    this.outputItem.emit(item)
  }
}
