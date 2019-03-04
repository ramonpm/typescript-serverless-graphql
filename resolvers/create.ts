import * as AWS from 'aws-sdk';
import { v1 } from 'uuid';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const addProduct = (data) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      name: data.name,
      quantity: data.quantity,
      id: v1(),
      addedAt: Date.now()
    }
  };
  return dynamoDb.put(params).promise().then(_result => params.Item)
};

export default addProduct;