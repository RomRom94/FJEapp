// IMPORT
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})

export class FormLoginComponent implements OnInit {

  public formData: FormGroup;

  @Output() formSubmit = new EventEmitter();

  constructor(
    // tslint:disable-next-line: no-shadowed-variable
    private FormBuilder: FormBuilder
  ) {}

// METHODS

  private resetForm = ()  => {
    this.formData = this.FormBuilder.group({
      email: [ null, Validators.required ],
      password: [ null, Validators.required ]
    });
  }

  ngOnInit() {
    this.resetForm();
  }
}
