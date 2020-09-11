import * as EmailValidator from 'email-validator'

export function isValidEmail (email) {
  return EmailValidator.validate(email)
}

export function isValidFullName (name) {
  if (name.length > 3 && name.includes(' ')) return true
  return false
}