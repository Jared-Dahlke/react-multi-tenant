const development = {
  environment: 'development',
  apiGateway: {
    REGION: "YOUR_DEV_API_GATEWAY_REGION",
    MOCKURL: "https://reqres.in/api", //mock api
    URL: "http://localhost:4000"
   //URL: "https://api-cont-intell-user-account-staging-zu7blp7gxa-uw.a.run.app"
  }
}

const staging = {
  environment: 'staging',
  apiGateway: {
    REGION: "YOUR_DEV_API_GATEWAY_REGION",
    MOCKURL: "https://reqres.in/api/staging", //mock api
    URL: "http://52.250.22.66:4000"
  }
}

const production = {
  environment: 'production',
  apiGateway: {
    REGION: "YOUR_PROD_API_GATEWAY_REGION",
    URL: "https://reqres.in/api",
    MOCKURL:"never used"
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