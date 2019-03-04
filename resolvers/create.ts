import { v1 } from 'uuid';
import dynamoDb from '../config/database';

const addProduct = async (data: { [x: string]: any; name?: any; quantity?: any; }) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      name: data.name,
      quantity: data.quantity,
      id: v1(),
      addedAt: Date.now()
    }
  };
  await dynamoDb.put(params).promise();
  return params.Item;
};

export default addProduct;