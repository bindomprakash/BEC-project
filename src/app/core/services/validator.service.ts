import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  LogValidationService(group, formErrors, validationMesssage):void {
    Object.keys(group.controls).forEach((key: string) => {
      const controlConst = group.get(key);
      formErrors[key] = '';
      if (controlConst && !controlConst.valid &&
        (controlConst.touched || controlConst.dirty)) {
        const errorMessage = validationMesssage[key];
        for (const errorKey in controlConst.errors) {
          if (errorKey) {
             formErrors[key] += errorMessage[errorKey] + '';
          }
        }
      }
      if (controlConst instanceof FormGroup) {
         this.LogValidationService(controlConst, formErrors, validationMesssage);
      }
    });
  }
  
  markAsTouched(formData):void {
    Object.keys(formData.controls).forEach(field => {
      const control = formData.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  markAsUntouched(formData):void {
    Object.keys(formData.controls).forEach(field => {
      const control = formData.get(field);
      control.markAsUntouched({ onlySelf: true });
    });
  }
  
  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notMatched: true})
      } else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }
}
