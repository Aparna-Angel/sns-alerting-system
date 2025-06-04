import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as cw_actions from 'aws-cdk-lib/aws-cloudwatch-actions';
import * as path from 'path';

export class SnsAlertingSystemStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

  
    const fn = new lambda.Function(this, 'MyFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'sns.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
    });

    // SNS Topic
    const topic = new sns.Topic(this, 'LambdaAlertTopic');

    // Email Subscription (change to your email)
    topic.addSubscription(new subs.EmailSubscription('aparna.a.manumala@accenture.com'));

    // CloudWatch Alarm on Lambda Errors
    const errorMetric = fn.metricErrors({
      period: cdk.Duration.minutes(1),
      statistic: 'Sum',
    });

    const errorAlarm = new cloudwatch.Alarm(this, 'LambdaErrorAlarm', {
      metric: errorMetric,
      threshold: 1,
      evaluationPeriods: 1,
      alarmDescription: 'Alarm when the Lambda function fails',
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
    });

    // Link Alarm to SNS
    errorAlarm.addAlarmAction(new cw_actions.SnsAction(topic));
  }
}



