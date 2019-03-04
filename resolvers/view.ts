import dynamoDb from "../config/database";

const viewProduct = async (id: any) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id }
  };
  const r = await dynamoDb.get(params).promise();
  return r.Item;
};

export default viewProduct;
