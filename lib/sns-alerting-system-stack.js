"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnsAlertingSystemStack = void 0;
const cdk = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const sns = require("aws-cdk-lib/aws-sns");
const subs = require("aws-cdk-lib/aws-sns-subscriptions");
const cloudwatch = require("aws-cdk-lib/aws-cloudwatch");
const cw_actions = require("aws-cdk-lib/aws-cloudwatch-actions");
const path = require("path");
class SnsAlertingSystemStack extends cdk.Stack {
    constructor(scope, id, props) {
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
exports.SnsAlertingSystemStack = SnsAlertingSystemStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25zLWFsZXJ0aW5nLXN5c3RlbS1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNucy1hbGVydGluZy1zeXN0ZW0tc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW1DO0FBRW5DLGlEQUFpRDtBQUNqRCwyQ0FBMkM7QUFDM0MsMERBQTBEO0FBQzFELHlEQUF5RDtBQUN6RCxpRUFBaUU7QUFDakUsNkJBQTZCO0FBRTdCLE1BQWEsc0JBQXVCLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDbkQsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUd4QixNQUFNLEVBQUUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUNqRCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLE9BQU8sRUFBRSxhQUFhO1lBQ3RCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztTQUMvRCxDQUFDLENBQUM7UUFFSCxZQUFZO1FBQ1osTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBRXRELDRDQUE0QztRQUM1QyxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlDQUFpQyxDQUFDLENBQUMsQ0FBQztRQUVyRixvQ0FBb0M7UUFDcEMsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQztZQUNsQyxNQUFNLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQy9CLFNBQVMsRUFBRSxLQUFLO1NBQ2pCLENBQUMsQ0FBQztRQUVILE1BQU0sVUFBVSxHQUFHLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDaEUsTUFBTSxFQUFFLFdBQVc7WUFDbkIsU0FBUyxFQUFFLENBQUM7WUFDWixpQkFBaUIsRUFBRSxDQUFDO1lBQ3BCLGdCQUFnQixFQUFFLHNDQUFzQztZQUN4RCxrQkFBa0IsRUFBRSxVQUFVLENBQUMsa0JBQWtCLENBQUMsa0NBQWtDO1NBQ3JGLENBQUMsQ0FBQztRQUVILG9CQUFvQjtRQUNwQixVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7Q0FDRjtBQWxDRCx3REFrQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYSc7XG5pbXBvcnQgKiBhcyBzbnMgZnJvbSAnYXdzLWNkay1saWIvYXdzLXNucyc7XG5pbXBvcnQgKiBhcyBzdWJzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zbnMtc3Vic2NyaXB0aW9ucyc7XG5pbXBvcnQgKiBhcyBjbG91ZHdhdGNoIGZyb20gJ2F3cy1jZGstbGliL2F3cy1jbG91ZHdhdGNoJztcbmltcG9ydCAqIGFzIGN3X2FjdGlvbnMgZnJvbSAnYXdzLWNkay1saWIvYXdzLWNsb3Vkd2F0Y2gtYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuXG5leHBvcnQgY2xhc3MgU25zQWxlcnRpbmdTeXN0ZW1TdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICBcbiAgICBjb25zdCBmbiA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgJ015RnVuY3Rpb24nLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMThfWCxcbiAgICAgIGhhbmRsZXI6ICdzbnMuaGFuZGxlcicsXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL2xhbWJkYScpKSxcbiAgICB9KTtcblxuICAgIC8vIFNOUyBUb3BpY1xuICAgIGNvbnN0IHRvcGljID0gbmV3IHNucy5Ub3BpYyh0aGlzLCAnTGFtYmRhQWxlcnRUb3BpYycpO1xuXG4gICAgLy8gRW1haWwgU3Vic2NyaXB0aW9uIChjaGFuZ2UgdG8geW91ciBlbWFpbClcbiAgICB0b3BpYy5hZGRTdWJzY3JpcHRpb24obmV3IHN1YnMuRW1haWxTdWJzY3JpcHRpb24oJ2FwYXJuYS5hLm1hbnVtYWxhQGFjY2VudHVyZS5jb20nKSk7XG5cbiAgICAvLyBDbG91ZFdhdGNoIEFsYXJtIG9uIExhbWJkYSBFcnJvcnNcbiAgICBjb25zdCBlcnJvck1ldHJpYyA9IGZuLm1ldHJpY0Vycm9ycyh7XG4gICAgICBwZXJpb2Q6IGNkay5EdXJhdGlvbi5taW51dGVzKDEpLFxuICAgICAgc3RhdGlzdGljOiAnU3VtJyxcbiAgICB9KTtcblxuICAgIGNvbnN0IGVycm9yQWxhcm0gPSBuZXcgY2xvdWR3YXRjaC5BbGFybSh0aGlzLCAnTGFtYmRhRXJyb3JBbGFybScsIHtcbiAgICAgIG1ldHJpYzogZXJyb3JNZXRyaWMsXG4gICAgICB0aHJlc2hvbGQ6IDEsXG4gICAgICBldmFsdWF0aW9uUGVyaW9kczogMSxcbiAgICAgIGFsYXJtRGVzY3JpcHRpb246ICdBbGFybSB3aGVuIHRoZSBMYW1iZGEgZnVuY3Rpb24gZmFpbHMnLFxuICAgICAgY29tcGFyaXNvbk9wZXJhdG9yOiBjbG91ZHdhdGNoLkNvbXBhcmlzb25PcGVyYXRvci5HUkVBVEVSX1RIQU5fT1JfRVFVQUxfVE9fVEhSRVNIT0xELFxuICAgIH0pO1xuXG4gICAgLy8gTGluayBBbGFybSB0byBTTlNcbiAgICBlcnJvckFsYXJtLmFkZEFsYXJtQWN0aW9uKG5ldyBjd19hY3Rpb25zLlNuc0FjdGlvbih0b3BpYykpO1xuICB9XG59XG5cblxuXG4iXX0=