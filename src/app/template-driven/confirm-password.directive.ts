import { Directive, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, FormGroup, } from '@angular/forms';

@Directive({
  selector: '[appConfirmPassword]',
  providers: [{
    provide: NG_VALIDATORS, useExisting: forwardRef(() => ConfirmPasswordDirective), multi: true
  }]
})
export class ConfirmPasswordDirective implements Validator {

  @Input('appConfirmPassword') appConfirmPassword: string[] = [];  //now we can pass somthing to directive  as used in 'templated-driven.component.html'

  constructor() { }

  validate(formGroup: FormGroup) {

    const password = formGroup.controls[this.appConfirmPassword[0]];
    const confirmPassword = formGroup.controls[this.appConfirmPassword[1]];

    // return null if controls haven't initialised yet
    if (!password || !confirmPassword) {
      return null;
    }
    
    // set error on confirmPassword if validation fails
    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ confirmPassword: true });
    } else {
      confirmPassword.setErrors(null);
    }
  }

}
