import * as EmailValidator from 'email-validator'

export function isValidEmail (email) {
  return EmailValidator.validate(email)
}

export function isLastNameError (text) {
 return text.length > 0 && text.length < 2
}

export function isLastNameSuccess (text) {
  return text.length > 1
}

export function isFirstNameError (text) {
  return text.length > 0 && text.length < 2
}

export function isFirstNameSuccess (text) {
  return text.length > 1
}

export function isCompanyError (text) {
  return text.length > 0 && text.length < 2
}

export function isCompanySuccess (text) {
  return text.length >= 2 ? true : false
}

export function isRoleSuccess (text) {
 return text.length > 0
}

export function isEmailError (text) {
 return text.length > 0 && !isValidEmail(text)
}

export function isEmailSuccess (text) {
  return isValidEmail(text)
}
