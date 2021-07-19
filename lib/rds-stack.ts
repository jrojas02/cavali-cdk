import {App, Duration, Stack, StackProps} from "@aws-cdk/core";
import {Credentials, DatabaseInstance, DatabaseInstanceEngine, PostgresEngineVersion, StorageType} from '@aws-cdk/aws-rds';
import {InstanceClass, InstanceSize, InstanceType, Peer, SubnetType, Vpc} from "@aws-cdk/aws-ec2";
import { DBCredentials} from "./db-credentials-stack";

export interface RDSStackProps extends StackProps {
    vpc: Vpc;
    //credentials: DBCredentials;
}

export class RDSStack extends Stack {

    readonly mySQLRDSInstance: DatabaseInstance;
    private vpc: Vpc;

    constructor(scope: App, id: string, props: RDSStackProps) {
        super(scope, id, props);
        //const username = props.credentials.username.secretValue.toString;
        //const password = props.credentials.password.secretValue;
        
        this.mySQLRDSInstance = new DatabaseInstance(this, 'instance-postgres', {
            engine: DatabaseInstanceEngine.postgres({
                version: PostgresEngineVersion.VER_10_4
            }),
            instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.SMALL),
            vpc: props.vpc,
            vpcPlacement: {subnetType: SubnetType.ISOLATED},
            storageEncrypted: true,
            multiAz: false,
            autoMinorVersionUpgrade: false,
            allocatedStorage: 25,
            storageType: StorageType.GP2,
            backupRetention: Duration.days(3),
            deletionProtection: false,
            databaseName: 'CavaliDB',
            //credentials: Credentials.fromGeneratedSecret()
            port: 5432,
        });
    
    }
}