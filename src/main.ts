import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { cognitoConfig } from './app/core/cognito.config';
import { Amplify } from 'aws-amplify';

Amplify.configure(cognitoConfig);
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
