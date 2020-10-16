import { Attribute, Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appEqualToValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EqualToValidatorDirective, multi: true
  }]
})

export class EqualToValidatorDirective implements Validator {
  private subscription: any;

  constructor(@Attribute('appValidateEqual') public validateEqual: string) { }

  validate(c: AbstractControl): { [key: string]: any } {
    const v = c.value;
    const e = c.root.get(this.validateEqual);

    // subscribe to future changes in password
    if (!this.subscription) {
      this.subscription = e.valueChanges.subscribe((val: string) => {
        if (val !== v) {
          c.setErrors({ validateEqual: true });
        } else {
          c.setErrors(null);
        }
      });
    }

    if (e && v !== e.value) {
      return { validateEqual: true };
    }
    return { };
  }
}
