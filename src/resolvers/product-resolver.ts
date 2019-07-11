import {
  Resolver,
  Query,
  Arg,
  Mutation,
} from 'type-graphql';
import { v1 } from 'uuid';
import Product from '../models/product';
import dynamoDb from '../config/database';
import ProductInput from './types/product-input';

@Resolver(Product)
export default class ProductResolver {
  constructor() {}

  @Query(returns => Product)
  async product(@Arg("id") id: string) {
    const params = {
      TableName: process.env.TABLE_NAME,
      Key: { id }
    };
    const r = await dynamoDb.get(params).promise();
    return r.Item;
  }

  @Query(returns => [Product])
  async products() {
    const result = await dynamoDb.scan({ TableName: process.env.TABLE_NAME }).promise()
    return result.Items;
  }

  @Mutation(returns => Product)
  async addProduct(
    @Arg("data") data: ProductInput,
  ): Promise<Product> {
    const params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        id: v1(),
        name: data.name,
        quantity: data.quantity,
        addedAt: Date.now(),
        updatedAt: Date.now()
      }
    };
    await dynamoDb.put(params).promise();
    return params.Item;
  }

  @Mutation(returns => Product)
  async updateProduct(
    @Arg("id") id: string,
    @Arg("data") data: ProductInput,
  ) {
    const params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        id: id,
        name: data.name,
        quantity: data.quantity,
        updatedAt: Date.now()
      }
    };
    await dynamoDb.put(params).promise();

    // Couldn't figure out a way to return the updated values with only the put action
    const paramsGet = {
      TableName: process.env.TABLE_NAME,
      Key: { id }
    }
    const r = await dynamoDb.get(paramsGet).promise();

    return r.Item;
  }

  @Mutation(returns => Boolean)
  async removeProduct(@Arg("id") id: string) {
    const params = {
      TableName: process.env.TABLE_NAME,
      Key: { id },
      ReturnValues: "ALL_OLD"
    };
    const response  = await dynamoDb.delete(params).promise();
    return !!response.Attributes;
  }
}
