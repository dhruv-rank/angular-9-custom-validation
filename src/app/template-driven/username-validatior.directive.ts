import { Directive } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator, FormControl, ValidationErrors } from '@angular/forms';
import { BasicService } from '../basic.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[appUsernameValidatior]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS, 
    useExisting: UsernameValidatiorDirective, 
    multi: true
  }]
})
export class UsernameValidatiorDirective implements AsyncValidator {

  constructor(private basicService: BasicService) { }

  validate(formControl: FormControl): Observable<ValidationErrors> {
    return this.basicService.validateUserName(formControl.value).pipe(map(reponse => {          // if api resopnse is false than set error of usernameError
      if (!reponse) {
        return { 'usernameError': true }
      } else {
        return null;
      }
    }));
  }

}
