import * as AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const removeProduct = (id) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id }
  };
  return dynamoDb.delete(params).promise();
};

export default removeProduct;
