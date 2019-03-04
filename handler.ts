import { APIGatewayProxyHandler } from 'aws-lambda';
import { graphql } from 'graphql';
import { schema } from './schema';

export const queryProducts: APIGatewayProxyHandler = async (event, _context) => {
  const result = await graphql(schema, event.body);
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
}
