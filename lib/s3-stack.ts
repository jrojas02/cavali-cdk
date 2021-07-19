import {App, Stack, StackProps} from '@aws-cdk/core';
import {Bucket} from '@aws-cdk/aws-s3';

export class S3Stack extends Stack {
    readonly bucket: Bucket;
    
    constructor(scope: App, id: string, props?: StackProps) {
        super(scope, id, props);
        this.bucket = new Bucket(this, 'CavaliBucket', {
            versioned: true,
            bucketName: 'cavali-bucket',
            publicReadAccess: true,
        });
    }
}