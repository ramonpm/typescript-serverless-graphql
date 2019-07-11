import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export default class Product {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  quantity: number;

  @Field()
  addedAt: number;

  @Field()
  updatedAt: number;
}
