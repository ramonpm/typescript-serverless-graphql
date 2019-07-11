import dynamoDb from "../database";

describe('DynamoDB Client', () => {
  it('is configured correctly in production', () => {
    expect(dynamoDb.toString().includes('localhost')).toBeFalsy();
  });
});
