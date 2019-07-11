import { InputType, Field } from 'type-graphql'

@InputType()
export default class ProductInput {
  @Field()
  name: string;

  @Field()
  quantity: number;
}