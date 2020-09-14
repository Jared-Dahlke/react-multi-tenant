import * as EmailValidator from 'email-validator'

export function isValidEmail (email) {
  return EmailValidator.validate(email)
}