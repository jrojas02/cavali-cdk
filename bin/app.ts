#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');

import { VpcStack } from "../lib/vpc-stack";
import { S3Stack } from "../lib/s3-stack";
import { RDSStack } from "../lib/rds-stack";
import {ApplicationStack} from "../lib/application-stack";


const app = new cdk.App();
const vpcStack  = new VpcStack(app, 'VpcStack');
new S3Stack (app, 'S3Stack');
const rdsStack = new RDSStack(app, 'RDSStack', { vpc: vpcStack.vpc });
//const lambdaStack = new LambdaStack(app, 'LambdaStack', { vpc: vpcStack.vpc });

new ApplicationStack(app, 'ApplicationStack', {
    vpc: vpcStack.vpc,
    inboundDbAccessSecurityGroup:  rdsStack.mySQLRDSInstance.connections.securityGroups[0].securityGroupId,
    rdsEndpoint: rdsStack.mySQLRDSInstance.dbInstanceEndpointAddress,
    //rdsDbUser: rdsStack.dbUser,
    //rdsDb: rdsStack.dbSchema,
    //rdsPort: rdsStack.dbPort,
});

app.synth();



