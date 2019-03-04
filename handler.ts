import { GraphQLServerLambda } from 'graphql-yoga';
import { schema } from './schema';

const lambda = new GraphQLServerLambda({schema});

export const queryProducts = lambda.graphqlHandler;
export const playground = lambda.playgroundHandler;