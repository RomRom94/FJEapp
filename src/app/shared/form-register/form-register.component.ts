// IMPORT
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})

export class FormRegisterComponent implements OnInit {

  public formData: FormGroup;

  @Output() formSubmit = new EventEmitter();

  // tslint:disable-next-line: no-shadowed-variable
  constructor( private FormBuilder: FormBuilder ) { }

// METHODS

  private resetForm = ()  => {
    this.formData = this.FormBuilder.group({
      firstname: [ null, Validators.required ],
      lastname: [ null, Validators.required ],
      email: [ null, Validators.required ],
      password: [ null, Validators.required ],
      confirm_password: [ null, Validators.required ]
    });
  }

  ngOnInit() {
    this.resetForm();
  }
}
