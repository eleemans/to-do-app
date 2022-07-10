import * as AWS from 'aws-sdk';
import internal = require('stream');
import {v4 as uuidv4} from '/to-do/node_modules/uuid'


const TABLE_NAME = 'todo'
const PRIMARY_KEY = 'id'

const db = new AWS.DynamoDB.DocumentClient();

const RESERVED_RESPONSE = `Error: You're using AWS reserved keywords as attributes`,
  DYNAMODB_EXECUTION_ERROR = `Error: Execution update, caused a Dynamodb error, please take a look at your CloudWatch Logs.`;

export const createTodo = async (event: any = {}): Promise<any> => {

  if (!event.body) {
    return { statusCode: 400, body: 'invalid request, you are missing the parameter body' };
  }
  const item = typeof event.body == 'object' ? event.body : JSON.parse(event.body);
  item[PRIMARY_KEY] = uuidv4();
  const params = {
    TableName: TABLE_NAME,
    Item: item
  };

  try {
    await db.put(params).promise();
    return { statusCode: 201, body: '' };
  } catch (dbError) {
    // const errorResponse = dbError.code === 'ValidationException' && dbError.message.includes('reserved keyword') ?
    //   DYNAMODB_EXECUTION_ERROR : RESERVED_RESPONSE;
    return { statusCode: 500, body: 'errorResponse' };
  }
};