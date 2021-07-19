import { ISecret, Secret } from "@aws-cdk/aws-secretsmanager";
import * as cdk from "@aws-cdk/core";

export interface DBCredentials {
  username: ISecret;
  password: ISecret;
}

export class DbCredentialsStack extends cdk.Stack {
  readonly dbCredentials: { username: ISecret; password: ISecret };

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const secretUsername = Secret.fromSecretArn(
      this,
      "BackendPersistenceUsername",
      `arn:aws:secretsmanager:${this.region}:${this.account}:secret:prod/service/db/user-ydPlFe`
    );

    const secretPassword = Secret.fromSecretArn(
      this,
      "BackendPersistencePassword",
      `arn:aws:secretsmanager:${this.region}:${this.account}:secret:prod/service/db/password-8tozRu`
    );
    this.dbCredentials = {
      username: secretUsername,
      password: secretPassword,
    };
  }
}