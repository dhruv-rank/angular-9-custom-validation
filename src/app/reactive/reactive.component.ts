import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, ValidationErrors } from '@angular/forms';
import { BasicService } from '../basic.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private basicService: BasicService) { }

  reactiveForm: FormGroup;
  formSubmitted = false;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.reactiveForm = this.formBuilder.group({
      username: ['', [Validators.required], [this.validateUserName.bind(this)]],     // bind this for reference of the class ReactiveComponent
      email: ['', [Validators.required, this.emailValodation()]],       // custom email vaidator
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    }, { validators: [this.confirmPasswordValidation(['password', 'confirmPassword'])] });     // custom confirm-password validator for form-group
  }
  onSubmit() {
    this.formSubmitted = true;
    if (!this.reactiveForm.valid) {
      return;
    }
    alert('success')
    console.log(this.reactiveForm.value);
  }


  emailValodation(): ValidatorFn {
    return ((control: FormControl): ValidationErrors | null => {
      console.log(control.value);
      if (control.value && control.value.trim().match(/\w*yahoo.com$/)) {    // one only that ends with 'yahoo.com' is valid
        return null;
      }
      return ({ 'emailError': true })
    });
  }

  confirmPasswordValidation(passwords: string[]): ValidatorFn {
    return ((form: FormGroup): ValidationErrors | null => {

      const password = form.controls[passwords[0]];
      const confirmPassword = form.controls[passwords[1]];

      // return null if controls haven't initialised yet
      if (!password || !confirmPassword) {
        return null;
      }

      // set error on confirmPassword if validation fails
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ confirmPassword: true });    //set error to form-control
      } else {
        confirmPassword.setErrors(null);   //remove error using setErrors(null) from form-control
      }
    });
  }

  validateUserName(username: FormControl) {
    return this.basicService.validateUserName(username.value).pipe(map(response => {           // if api resopnse is false than set error of usernameError
      if (!response) {
        return { 'usernameError': true }
      } else {
        return null;
      }
    }));
  }
}
