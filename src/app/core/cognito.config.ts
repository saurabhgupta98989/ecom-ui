import { ResourcesConfig } from 'aws-amplify';

export const cognitoConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'ap-south-1_pwt4mjt7o',
      userPoolClientId: '519238ipm78ts4t731omh6f77',
      loginWith: {
        oauth: {
          domain: 'ap-south-1pwt4mjt7o.auth.ap-south-1.amazoncognito.com',
          scopes: ['openid', 'email', 'profile'],
          redirectSignIn: ['http://localhost:4200/'],
          redirectSignOut: ['http://localhost:4200/'],
          responseType: 'code',
        },
      },
    },
  },
};
