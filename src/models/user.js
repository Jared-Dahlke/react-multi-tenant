
export class User {
  constructor (userId, firstName, lastName, company, email, userType, roles, accounts) {

    if (arguments.length !== 7) {
      //throw new Error('invalid User argument count')
    }
   
    if (!firstName || !lastName || !company || !email || !roles  || !userType) {
      throw new Error('invalid User arguments: missing required argument')
    }

    this.userId = userId
    this.firstName = firstName
    this.lastName = lastName
    this.company = company
    this.email = email
    this.userType = userType
    this.roles = roles
    this.accounts = accounts
  }
}
