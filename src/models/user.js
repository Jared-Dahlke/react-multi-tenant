
export class User {
  constructor (userId, firstName, lastName, company, email, internal) {
    if (arguments.length !== 6) {
      throw new Error('invalid User argument count')
    }
   
    if (!firstName || !lastName || !company || !email || !internal) {
      throw new Error('invalid User arguments: missing required argument')
    }

    this.userId = userId
    this.firstName = firstName
    this.lastName = lastName
    this.company = company
    this.email = email
    this.internal = internal
  }
}


