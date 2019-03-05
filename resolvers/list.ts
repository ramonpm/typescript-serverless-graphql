import dynamoDb from "../config/database";

const listProducts = async () => {
  const result = await dynamoDb.scan({ TableName: process.env.TABLE_NAME }).promise()
  return result.Items;
}

export default listProducts;
