export const OTP_TIMER = 60 * 1
export const OTP_RESENT_MAX_TIME = 1000 * 60 * 10
export const MAX_OTP_LIMIT = 3

export const employerFirstnameMinLength = 3
export const employerFirstnameMaxLength = 20
export const employerLastnameMinLength = 1
export const employerLastnameMaxLength=10
export const jobseekerfirstnameMinLength = 3
export const jobseekerfirstnameMaxLength = 20
export const jobseekerLastnameMinLength = 1
export const jobseekerLastnameMaxLength=10
export const passwordLength = 8
export const emailRegex ='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
export const OTPRegex = '^[0-9]{6}$';
export const ZipRegex ='^[1-9][0-9]{5}$'
export const firstnameRegex = `^[a-zA-Z ]{${employerFirstnameMinLength},${employerFirstnameMaxLength}}$`
export const lastnameRegex = `^[a-zA-Z ]{${employerLastnameMinLength},${employerLastnameMaxLength}}$`
export const passwordRegex =`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{${passwordLength},}$`
export const charRegex =/^[A-Z]$/
export const mobileRegex ='^[1-9][0-9]{9}$'