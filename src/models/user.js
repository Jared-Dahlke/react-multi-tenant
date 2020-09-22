
export class User {
  constructor (userId, firstName, lastName, company, email, internal, roles, accounts) {
    if (arguments.length !== 8) {
      throw new Error('invalid User argument count')
    }
    
   
    if (!firstName || !lastName || !company || !email || !roles || !accounts || internal == undefined) {
      throw new Error('invalid User arguments: missing required argument')
    }

    let isInternal = true
    if (internal !== 'Internal') {
      isInternal = false
    }

    this.userId = userId
    this.firstName = firstName
    this.lastName = lastName
    this.company = company
    this.email = email
    this.internal = isInternal
    this.roles = roles
    this.accounts = accounts
  }
}
