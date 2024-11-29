import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export const nameValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (Validators.required(control)) {
      return { errorMessage: 'You must enter a name' };
    }
    return null;
  };

  export const emailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (Validators.required(control)) {
      return { errorMessage: 'You must enter an email' };
    }
    if (Validators.email(control)){
      return { errorMessage: 'You must enter a valid email' };
    }
    return null;
  };

  export const messageValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (Validators.required(control)) {
      return { errorMessage: 'You must enter a message' };
    }
    if (Validators.minLength(20)(control)) {
      return { errorMessage: 'Message length must be at least 20 characters' };
    }
    return null;
  };
