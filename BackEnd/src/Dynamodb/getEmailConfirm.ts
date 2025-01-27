import { ScanCommand } from "@aws-sdk/client-dynamodb";
import client from "./awsClient"

const getEmailConfirm = async (Email: string): Promise<boolean | null> => {
    const params = {
        TableName: "LeadsUser",
        FilterExpression: "email = :email",
        ExpressionAttributeValues: {
            ":email": { S: Email },
        },
    };
    const result = await client.send(new ScanCommand(params));
    return result.Count > 0;
};

export default getEmailConfirm;
