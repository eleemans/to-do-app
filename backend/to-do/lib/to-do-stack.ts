import { Stack, StackProps, RemovalPolicy} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { IResource, LambdaIntegration, MockIntegration, PassthroughBehavior, RestApi } from 'aws-cdk-lib/aws-apigateway';

export class ToDoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const dynamoTable = new Table(this, 'todo', {
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING
      },
      tableName: 'todo',

      /**
       *  The default removal policy is RETAIN, which means that cdk destroy will not attempt to delete
       * the new table, and it will remain in your account until manually deleted. By setting the policy to
       * DESTROY, cdk destroy will delete the table (even if it has data in it)
       */
      removalPolicy: RemovalPolicy.DESTROY, // NOT recommended for production code
    });

    const createTodo = new lambda.Function(this, "createTodo", {
      runtime: lambda.Runtime.NODEJS_14_X,
      code:lambda.Code.fromAsset('lambda'),
      handler: 'createTodo.createTodo'
    })

    const getTodo = new lambda.Function(this, "getTodo", {
      runtime: lambda.Runtime.NODEJS_14_X,
      code:lambda.Code.fromAsset('lambda'),
      handler: 'getTodo.getTodo'
    })

    dynamoTable.grantReadWriteData(createTodo);
    dynamoTable.grantReadWriteData(getTodo);

    const getAllIntegration = new LambdaIntegration(getTodo);
    const createOneIntegration = new LambdaIntegration(createTodo);





    // defines an API Gateway REST API resource backed by our "hello" function.
    const todoApi = new RestApi(this, 'todossApi', {
      restApiName: 'Todos Service'
    });

    const todos = todoApi.root.addResource('items');
    todos.addMethod('GET', getAllIntegration);
    todos.addMethod('POST', createOneIntegration);
    addCorsOptions(todos);

    
  }

  
}

export function addCorsOptions(apiResource: IResource) {
  apiResource.addMethod('OPTIONS', new MockIntegration({
    integrationResponses: [{
      statusCode: '200',
      responseParameters: {
        'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
        'method.response.header.Access-Control-Allow-Origin': "'*'",
        'method.response.header.Access-Control-Allow-Credentials': "'false'",
        'method.response.header.Access-Control-Allow-Methods': "'OPTIONS,GET,PUT,POST,DELETE'",
      },
    }],
    passthroughBehavior: PassthroughBehavior.NEVER,
    requestTemplates: {
      "application/json": "{\"statusCode\": 200}"
    },
  }), {
    methodResponses: [{
      statusCode: '200',
      responseParameters: {
        'method.response.header.Access-Control-Allow-Headers': true,
        'method.response.header.Access-Control-Allow-Methods': true,
        'method.response.header.Access-Control-Allow-Credentials': true,
        'method.response.header.Access-Control-Allow-Origin': true,
      },
    }]
  })
}
