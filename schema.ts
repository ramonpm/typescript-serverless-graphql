import { buildSchema } from 'type-graphql';
import ProductResolver from './resolvers/product';

export default async function setGlobalSchema() {
  // build TypeGraphQL executable schema
  (global as any).schema = (global as any).schema || await buildSchema({
    resolvers: [ProductResolver],
    validate: false,
  });
}
