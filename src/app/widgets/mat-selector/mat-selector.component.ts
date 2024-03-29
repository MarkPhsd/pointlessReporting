import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'pgReporting-mat-selector',
  templateUrl: './mat-selector.component.html',
  styleUrls: ['./mat-selector.component.scss']
})
export class MatSelectorComponent implements OnInit {

    @Output() selectItem = new EventEmitter();
    @Input() inputForm: UntypedFormGroup | undefined;
    @Input() fieldName: string = ''
    @Input() hideClear: boolean  = false;
    @Input() list: any;
    @Input() defaultValue: string = ''
    @ViewChild('formView')      formView: TemplateRef<any> | undefined;

    constructor() { }

    ngOnInit(): void {
      if (this.defaultValue) {
        // let item : any;
        // item.name = this.defaultValue;
        // if (this.inputForm && !this.inputForm.controls[this.fieldName].value) {
        //   this.inputForm.controls[this.fieldName].setValue(this.defaultValue)
        // }
      }
    }

    get isFormView() {
      if (this.inputForm) {
        return this.formView
      }
      return undefined;
    }

    setItem(item:any) {
      // console.log('setItem', item)
      this.selectItem.emit(item)
    }
  }
