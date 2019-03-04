import * as AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const listProducts = () => dynamoDb.scan({
  TableName: process.env.TABLE_NAME
}).promise()
  .then(r => r.Items);

export default listProducts;
