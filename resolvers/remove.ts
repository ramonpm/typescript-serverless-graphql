import dynamoDb from "../config/database";

const removeProduct = (id: any) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id }
  };
  return dynamoDb.delete(params).promise();
};

export default removeProduct;
