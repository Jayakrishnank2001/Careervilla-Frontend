import { Validators } from "@angular/forms";
import { emailRegex, OTPRegex, passwordRegex, passwordLength, ZipRegex, mobileRegex, firstnameRegex, employerFirstnameMinLength, employerFirstnameMaxLength, employerLastnameMinLength, employerLastnameMaxLength, lastnameRegex } from "./constants";

export const firstnameValidators = [
    Validators.required,
    Validators.minLength(employerFirstnameMinLength),
    Validators.maxLength(employerFirstnameMaxLength),
    Validators.pattern(firstnameRegex)
]

export const lastnameValidators = [
    Validators.required,
    Validators.minLength(employerLastnameMinLength),
    Validators.maxLength(employerLastnameMaxLength),
    Validators.pattern(lastnameRegex)
]

export const emailValidators = [
    Validators.required,
    Validators.pattern(emailRegex)
]

export const passwordValidators = [
    Validators.required,
    Validators.minLength(passwordLength),
    Validators.pattern(passwordRegex)
]

export const otpValidators = [
    Validators.required,
    Validators.pattern(OTPRegex)
]

export const zipValidators = [
    Validators.required,
    Validators.pattern(ZipRegex)
]

export const cityValidators = [
    Validators.required,
    Validators.pattern(firstnameRegex)
]

export const mobileValidators = [
    Validators.required,
    Validators.pattern(mobileRegex)
]

export const stateValidators = [
    Validators.required,
    Validators.pattern(firstnameRegex)
]

export const addressValidators = [
    Validators.required,
    Validators.pattern(firstnameRegex)
]

export const requiredValidators=[ Validators.required ]