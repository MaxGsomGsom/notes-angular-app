import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Directive({
  selector: '[appUserUniqueValid][ngModel]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: UserUniqueValidatorDirective, multi: true
  }]
})
export class UserUniqueValidatorDirective implements AsyncValidator {

  constructor(private userService: UserService) { }
  validate(control: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors> {
    const user = control.value;
    return this.userService.getUserByName(user).pipe(map(e => {
      return e.length > 0 ? { notUnique: true } : {};
    }));
  }
}
