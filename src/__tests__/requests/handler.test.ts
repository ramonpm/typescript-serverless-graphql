require('dotenv').config({ path: './.env.test' });

import { createTestClient } from 'apollo-server-testing';
import { server } from '../../handler';
import dynamoDb from '../../config/database';

const { query, mutate } = createTestClient(server);

describe('The Function Requests', () => {
  beforeEach(async () => {
    const result = await dynamoDb.scan({ TableName: process.env.TABLE_NAME }).promise();
    for (const item of result.Items) {
      const id = item.id;
      const params = {
        TableName: process.env.TABLE_NAME,
        Key: { id }
      };
      await dynamoDb.delete(params).promise();
    }
  });

  it('creates a product', async () => {
    const response = await mutate({
      mutation: `mutation {
        addProduct(data: {
            name: "Teste",
            quantity: 10
        }) {
            name
        }
      }`
    });
    expect(response.data).toEqual({ "addProduct": { "name": "Teste" } });
    const result = await dynamoDb.scan({ TableName: process.env.TABLE_NAME }).promise();
    expect(result.Items.length).toBe(1);
  });

  it('lists products', async () => {
    await addProductTest({
      id: 'test-id',
      name: 'test-name',
      quantity: 1
    })
    const response = await query({
      query: `{
        products {
          id
          name
        }
      }`
    });
    expect(response.data).toEqual({ "products": [{ "id": "test-id", "name": "test-name" }] });
  });

  it('shows a product', async () => {
    await addProductTest({
      id: 'test-id',
      name: 'test-name',
      quantity: 1
    })
    const response = await query({
      query: `{
        product(id: "test-id") {
          id
          name
        }
      }`
    });
    expect(response.data).toEqual({ "product": { "id": "test-id", "name": "test-name" } });
  });

  it('updates a product', async () => {
    await addProductTest({
      id: 'test-id',
      name: 'test-name',
      quantity: 1
    })
    const response = await mutate({
      mutation: `mutation {
        updateProduct(
          id: "test-id",
          data: {
            name: "updated-test",
            quantity: 2
        }) {
            id
            name
        }
      }`
    });
    expect(response.data.updateProduct.name).toBe('updated-test');
  });

  it('removes a product', async () => {
    await addProductTest({
      id: 'test-id',
      name: 'test-name',
      quantity: 1
    })
    const response = await mutate({
      mutation: `mutation {
        removeProduct(id: "test-id")
      }`
    });
    expect(response.data).toEqual({ "removeProduct": true });
    const result = await dynamoDb.scan({ TableName: process.env.TABLE_NAME }).promise();
    expect(result.Items.length).toBe(0);
  });

  it('does not remove a product without the correct id', async () => {
    await addProductTest({
      id: 'test-id',
      name: 'test-name',
      quantity: 1
    })
    const response = await mutate({
      mutation: `mutation {
        removeProduct(id: "wrong-id")
      }`
    });
    expect(response.data).toEqual({ "removeProduct": false });
    const result = await dynamoDb.scan({ TableName: process.env.TABLE_NAME }).promise();
    expect(result.Items.length).toBe(1);
  });
});

const addProductTest = async (data) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      id: data.id,
      name: data.name,
      quantity: data.quantity,
      addedAt: Date.now(),
      updatedAt: Date.now()
    }
  };
  await dynamoDb.put(params).promise();
}
