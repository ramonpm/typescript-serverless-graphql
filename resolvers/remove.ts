import dynamoDb from "../config/database";

const removeProduct = async (id: any) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: { id }
  };
  try {
    await dynamoDb.delete(params).promise();
    return true;
  } catch (error) {
    console.log(error);
  }
};

export default removeProduct;
