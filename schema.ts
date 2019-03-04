import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import addProduct from './resolvers/create';
import viewProduct from './resolvers/view';
import listProducts from './resolvers/list';
import removeProduct from './resolvers/remove';

const productType = new GraphQLObjectType({
  name: 'Product',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
    addedAt: { type: new GraphQLNonNull(GraphQLString) }
  }
});

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      listProducts: {
        type: new GraphQLList(productType),
        resolve: (_parent, _args) => listProducts()
      },
      viewProduct: {
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) }
        },
        type: productType,
        resolve: (_parent, args) => viewProduct(args.id)
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createProduct: {
        args: {
          name: { type: new GraphQLNonNull(GraphQLString) },
          quantity: { type: new GraphQLNonNull(GraphQLInt) }
        },
        type: productType,
        resolve: (_parent, args) => addProduct(args)
      },
      removeProduct: {
        args: {
          id: { type: new GraphQLNonNull(GraphQLString) }
        },
        type: GraphQLBoolean,
        resolve: (_parent, args) => removeProduct(args.id)
      }
    }
  })
});
