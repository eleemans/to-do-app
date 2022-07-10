import * as AWS from 'aws-sdk';

const TABLE_NAME = 'todo'

const db = new AWS.DynamoDB.DocumentClient();

export const getTodo = async (): Promise<any> => {

    const params = {
        TableName: TABLE_NAME
    };

    try {
        const response = await db.scan(params).promise();
        return { statusCode: 200,headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        }, body: JSON.stringify(response.Items) };
    } catch (dbError) {
        return { statusCode: 500, body: JSON.stringify(dbError) };
    }
};