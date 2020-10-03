const development = {
  environment: 'development',
  apiGateway: {
    URL: "http://localhost:4000"
   //URL: "https://api-cont-intell-user-account-staging-zu7blp7gxa-uw.a.run.app"
  }
}

const staging = {
  environment: 'staging',
  apiGateway: {
    URL: "https://api-cont-intell-user-account-staging-zu7blp7gxa-uw.a.run.app"
  }
}

const production = {
  environment: 'production',
  apiGateway: {
    URL: "https://api-cont-intell-user-account-prod-zu7blp7gxa-uw.a.run.app"
  }
};

var config = production
switch(process.env.REACT_APP_STAGE) {
case 'staging':
  config = staging
  break
case 'development':
  config = development
  break
default: 
  config = production
}


export default {
  // Add common config values here
  // MAX_ATTACHMENT_SIZE: 5000000,
  ...config
}