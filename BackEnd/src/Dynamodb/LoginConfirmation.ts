import { ScanCommand } from "@aws-sdk/client-dynamodb";
import client from "./awsClient"
import makeHash from "../Utils/makeHash";


const LoginConfirmation = async (Email: string, Password: string): Promise<boolean | null> => {
    const hashedPassword = makeHash(Email, Password)
    if (!hashedPassword) {
        return null
    }
    const params = {
        TableName: "LeadsUser",
        FilterExpression: "email = :email AND password = :password",
        ExpressionAttributeValues: {
            ":email": { S: Email },
            ":password": { S: hashedPassword },
        },
    };

    const result = await client.send(new ScanCommand(params));
    return result.Count > 0;
};

export default LoginConfirmation;
