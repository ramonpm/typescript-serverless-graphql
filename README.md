# typescript-serverless-graphql
Starting point for building a `Lambda + GraphQL + DynamoDB + Typescript + Webpack + TypeGraphQL` based application

```bash
yarn install
sls dynamodb install
sls offline start
```

# CRUD Operations sample
All HTTP Post requests.

## List Products
```
{
  products {
    id
    name
  }
}
```

## Show Product
```
{
  product(id: "602a12c0-942d-11e9-951c-bb18edc8c9c2") {
    id
    name
  }
}
```

## Update Product
```
mutation {
  updateProduct(
    id: "602a12c0-942d-11e9-951c-bb18edc8c9c2",
    data: {
      name: "deugood",
      quantity: 10
  }) {
      name
  }
}
```

## Delete Product
```
mutation {
  removeProduct(id: "602a12c0-942d-11e9-951c-bb18edc8c9c2")
}
```
