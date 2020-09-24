import * as EmailValidator from 'email-validator'
const passwordStrength = require('check-password-strength')

export function isValidEmail (email) {
  return EmailValidator.validate(email)
}

export function isLastNameError (text) {
  return text.length > 0 && text.length < 2
}

export function isLastNameSuccess (text) {
  return text.length > 1
}

export function isBrandProfileNameError (text) {
  return text.length < 2
}


export function isWebsiteUrlSuccess (text) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(text);
}

export function isWebsiteUrlError (text) {
  return !isWebsiteUrlSuccess(text)
}

export function isTwitterProfileSuccess (text) {
  return text.length > 1 && !text.includes('twitter.com')
}

export function isTwitterProfileError (text) {
  return text.length <= 1 || text.includes('twitter.com')
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

export function isValidPassword (text) {
  if(text.length > 1) {
    let val = passwordStrength(text)
    let strength = val.value
    return strength !== 'Weak'
  } else {
    return true
  }
}

export function invalidPasswordObject (text) {

  let requirements = [
    {id: 1, text: '6 characters minimum', satisfied: false}, 
    {id: 2, text: 'One special character', satisfied: false}, 
    {id: 3, text: 'One lowercase character', satisfied: false},
    {id: 4, text: 'One uppercase character', satisfied: false},
    {id: 5, text: 'One number', satisfied: false}
  ]

  if (text.length < 1) {
    return requirements
  }
  let val = passwordStrength(text)

  let contains = val.contains

  let hasLower = false
  let hasUpper = false
  let hasNumber = false
  let hasSpecial = false

  for (const prop of contains) {
    if (prop.message === 'lowercase') {
      hasLower = true
    }
    if (prop.message === 'uppercase') {
      hasUpper = true
    }
    if (prop.message === 'symbol') {
      hasSpecial = true
    }
    if (prop.message === 'number') {
      hasNumber = true
    }
  }

  let length = val.length

  let hasMinimum = false
  if (length >= 6) {
    hasMinimum = true
  }

  requirements[0].satisfied = hasMinimum
  requirements[1].satisfied = hasSpecial
  requirements[2].satisfied = hasLower
  requirements[3].satisfied = hasUpper
  requirements[4].satisfied = hasNumber

  return requirements
}
