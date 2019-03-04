import dynamoDb from "../config/database";

const listProducts = () => dynamoDb.scan({
  TableName: process.env.TABLE_NAME
}).promise()
  .then(r => r.Items);

export default listProducts;
