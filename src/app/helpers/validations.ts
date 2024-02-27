import { FormBuilder, type AbstractControl, type ValidationErrors, type ValidatorFn, isFormControl } from "@angular/forms";
import { repeat } from "rxjs";

const formBuilder = new FormBuilder()

export function validateByTrimming(validators: ValidatorFn[]): ValidatorFn{
    return (control: AbstractControl) => {
        const trimmedValue = control.value.trim()
        const trimmedControl = formBuilder.control(trimmedValue)
        return validators.reduce<ValidationErrors | null>((error:ValidationErrors|null,validator)=>error??validator(trimmedControl),null)
    }
}

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')
    const confirmPassword = control.get('confirmPassword')
    if (password != null && confirmPassword != null) {
        if (confirmPassword.value === '') {
            confirmPassword.setErrors({ required: true })
            return {required:true}
        }
        if (password.value != confirmPassword.value) {
            confirmPassword.setErrors({ passwordMismatch: true })
            return {passwordMismatch:true}
        }
    }
    confirmPassword?.setErrors(null)
    return null
}