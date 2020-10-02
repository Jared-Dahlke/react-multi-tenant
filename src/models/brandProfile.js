
export class BrandProfile {
  constructor (brandProfileId, brandProfileName, websiteUrl, twitterProfile, industryVertical, industrySubVertical) {
    //if (arguments.length !== 8) {
    //  throw new Error('invalid User argument count')
    //}
   
    //if (!firstName || !lastName || !company || !email || !internal || !roles || !accounts) {
    //  throw new Error('invalid User arguments: missing required argument')
    //}

    this.brandProfileId = brandProfileId
    this.brandProfileName = brandProfileName
    this.websiteUrl = websiteUrl
    this.twitterProfile = twitterProfile
    this.industryVertical = industryVertical
    this.industrySubVertical = industrySubVertical
  }
}
