import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,

    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      guitarId: uuid.v1(),
      title: data.title,
      description: data.description,
      urlLink: data.urlLink,
      votes: data.votes ?? "0",
      attachment: data.attachment,
      createdAt: Date.now(),
      isActive: true,
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
