import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-lambda';
import ProductResolver from './resolvers/product-resolver';
import { buildSchemaSync } from 'type-graphql';

export const server = new ApolloServer({
  schema: buildSchemaSync({
      resolvers: [ProductResolver],
      emitSchemaFile: true,
      validate: false
  })
});

export const graphql = server.createHandler();
