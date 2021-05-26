import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { BasicService } from '../basic.service';

@Directive({
  selector: '[appEmailValidation]',
  providers: [{
    // you have to add your custom validator to list of angular validator so you can use it like else validators of angular 
    provide: NG_VALIDATORS,
    //NG_VALIDATORS for simple validator and NG_ASYNC_VALIDATORS for async vallidator 
    useExisting: EmailCustomVaidation,
    multi: true
  }]
})
//must have to implement interface Validator or AsyncValidator
export class EmailCustomVaidation implements Validator {
  
  
  @Input("gteNum") gteNum:number        // take any attribute or directive value that are used on the form-control, on which we have added our custom 'appEmailValidation' validator
    
  validator: ValidatorFn;

  constructor(private basic: BasicService) {
    this.validator = this.validatonFunction;
  }


  //c will give you the control of field on which you have wrriten this directive name 
  validate(c: FormControl) {

    console.log(this.gteNum);

    return this.validator(c);
  }

  //validation function any as per below if any error in validation or else return null if there is no error in validation
  validatonFunction(c: FormControl): ValidationErrors | null {
    if (c.value && c.value.trim().match(/\w*yahoo.com$/)) {
      return null;
    }
    return ({ 'emailError': true })
  }

}
