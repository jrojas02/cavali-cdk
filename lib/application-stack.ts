import cdk = require('@aws-cdk/core');
import lambda = require('@aws-cdk/aws-lambda');
import {Duration, StackProps} from '@aws-cdk/core';
import {LambdaDestination} from '@aws-cdk/aws-s3-notifications';
//import {Bucket} from "@aws-cdk/aws-s3";


export class LambdaStack extends cdk.Stack {
  
   constructor(scope: cdk.App, id: string, props: ApplicationStackProps) {
       super(scope, id, props);

       const stepFunctionTrigger = new lambda.Function(this, 'lambdaTrigger01', {
        functionName: 'lambdaTrigger01',
        runtime: lambda.Runtime.JAVA_11,
        handler: 'triggers/lambda01.trigger',
        code: lambda.Code.fromAsset('../lambdas/deployment'),
     });
}