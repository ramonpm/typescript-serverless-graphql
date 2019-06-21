import 'reflect-metadata';
import { Context, APIGatewayProxyEvent, Callback, APIGatewayProxyResult } from 'aws-lambda';
import { ApolloServer } from 'apollo-server-lambda';
import setGlobalSchema from './schema'

async function bootstrap(event: APIGatewayProxyEvent, context: Context, callback: Callback<APIGatewayProxyResult>) {
  await setGlobalSchema();
  const schema = (global as any).schema;
  const server = new ApolloServer({ schema });
  server.createHandler()(event, context, callback);
}

export function graphql(event: APIGatewayProxyEvent, context: Context, callback: Callback<APIGatewayProxyResult>) {
  bootstrap(event, context, callback);
}
