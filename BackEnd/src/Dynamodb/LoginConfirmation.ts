import { ScanCommand } from "@aws-sdk/client-dynamodb";
import client from "./awsClient"
import makeHash from "../Utils/makeHash";


const LoginConfirmation = async (Email: string, Password: string) => {
    const hashedPassword = makeHash(Email, Password)
    if (!hashedPassword) {
        return null
    }
    const params = {
        TableName: "UserLeads",
        FilterExpression: "email = :email AND password = :password",
        ExpressionAttributeValues: {
            ":email": { S: Email },
            ":password": { S: hashedPassword },
        },
    };

    const result = await client.send(new ScanCommand(params));
    return result.Count > 0 ? result : null
};

export default LoginConfirmation;
