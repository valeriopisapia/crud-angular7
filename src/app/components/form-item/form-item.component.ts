import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { Items } from 'src/app/models/items';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class FormItemComponent implements OnInit {
  @Input() item: Items;
  @Output() actionForm = new EventEmitter();
  @ViewChild('fileInput') fileInput;
  id: string;
  editMode = false;
  editForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'] || "-1";
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  initForm() {
    this.editForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'date': new FormControl(moment(), Validators.required),
      'type': new FormControl('-1', Validators.required),
      'note': new FormControl(''),
      // 'file': new FormControl(null)
    })

    if (this.editMode) {
      this.editForm = new FormGroup({
        'name': new FormControl(this.item.name, Validators.required),
        'date': new FormControl(moment(this.item.date), Validators.required),
        'type': new FormControl(this.item.type.toLowerCase(), Validators.required),
        'note': new FormControl(this.item.note),
        // 'file': new FormControl(null)
      })
    }
  }

  onFileAdd() {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        //TODO: Implement the upload feature
        console.log(files[key]);
      }
    }
  }

  onFormSubmit() {
    this.actionForm.emit({ id: this.id, values: this.editForm.value });
  }

}
