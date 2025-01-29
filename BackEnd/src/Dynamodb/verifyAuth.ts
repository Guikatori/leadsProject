import { ScanCommand } from "@aws-sdk/client-dynamodb";
import client from "./awsClient"

export const getUser = async (Email: string): Promise<boolean | null> => {
    const params = {
        TableName: "UserLeads",
        FilterExpression: "email = :email",
        ExpressionAttributeValues: {
            ":email": { S: Email },
        },
    };
    const result = await client.send(new ScanCommand(params));
    return result.Count > 0;
};

export const verifyToken = async (key: string): Promise<boolean | null> => {
    const params = {
        TableName: "UserLeads",
        FilterExpression: "userKey = :userKey",
        ExpressionAttributeValues: {
            ":userKey": { S: key },
        },
    };
    const result = await client.send(new ScanCommand(params));
    return result.Count > 0;
};

