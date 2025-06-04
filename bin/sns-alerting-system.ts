#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { SnsAlertingSystemStack } from '../lib/sns-alerting-system-stack';

const app = new cdk.App();
new SnsAlertingSystemStack(app, 'SnsAlertingSystemStack', {
  
 
   env: { account: '491085391207', region: 'ap-south-1' },

});