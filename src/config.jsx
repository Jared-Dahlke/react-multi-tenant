const development = {
  //s3: {
  //  BUCKET: "YOUR_DEV_S3_UPLOADS_BUCKET_NAME"
  //},
  apiGateway: {
    REGION: "YOUR_DEV_API_GATEWAY_REGION",
    URL: "https://reqres.in/api" //mock api
  }
  //cognito: {
  //  REGION: "YOUR_DEV_COGNITO_REGION",
  //  USER_POOL_ID: "YOUR_DEV_COGNITO_USER_POOL_ID",
  //  APP_CLIENT_ID: "YOUR_DEV_COGNITO_APP_CLIENT_ID",
  //  IDENTITY_POOL_ID: "YOUR_DEV_IDENTITY_POOL_ID"
  //}
};

const staging = {
  //s3: {
  //  BUCKET: "YOUR_DEV_S3_UPLOADS_BUCKET_NAME"
  //},
  apiGateway: {
    REGION: "YOUR_DEV_API_GATEWAY_REGION",
    URL: "https://reqres.in/api" //mock api
  }
  //cognito: {
  //  REGION: "YOUR_DEV_COGNITO_REGION",
  //  USER_POOL_ID: "YOUR_DEV_COGNITO_USER_POOL_ID",
  //  APP_CLIENT_ID: "YOUR_DEV_COGNITO_APP_CLIENT_ID",
  //  IDENTITY_POOL_ID: "YOUR_DEV_IDENTITY_POOL_ID"
  //}
};

const production = {
  //s3: {
  //  BUCKET: "YOUR_PROD_S3_UPLOADS_BUCKET_NAME"
  //},
  apiGateway: {
    REGION: "YOUR_PROD_API_GATEWAY_REGION",
    URL: "https://reqres.in/api"
  }
  //cognito: {
  //  REGION: "YOUR_PROD_COGNITO_REGION",
  //  USER_POOL_ID: "YOUR_PROD_COGNITO_USER_POOL_ID",
  //  APP_CLIENT_ID: "YOUR_PROD_COGNITO_APP_CLIENT_ID",
  //  IDENTITY_POOL_ID: "YOUR_PROD_IDENTITY_POOL_ID"
  //}
};

//let config;
switch(process.env.REACT_APP_STAGE) {
  case 'production':
    var config = production
    break;
  case 'staging':
    var config = staging
    break;
  case 'development':
    var config = development
}

export default {
  // Add common config values here
 // MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};