import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import client from "./awsClient"
import makeHash from "../Utils/makeHash";
import {v4 as uuidv4} from 'uuid';

const addUserItem = async (formData: { name: string; email: string; phone: string; password: string; ploomesId: string }) => {

    const passwordHash = makeHash(formData.email, formData.password)
    const params = {
        TableName: "UserLeads",
        Item: {
            UserId: { S: uuidv4()},
            UserType: {S: 'User'},
            createdAt: {S: new Date().toString()},
            ploomesId: { S: formData.ploomesId },
            name: { S: formData.name },
            email: { S: formData.email },
            phone: { S: formData.phone },
            password: { S: passwordHash }
        }
    }
    try {
        const result = await client.send(new PutItemCommand(params));
        console.log("item inserido", result)
        return {statusCode: 200, data: result}
    } catch (error) {
        return {statusCode: error.$metadata?.httpStatusCode || 500, data: [], error: error.message}}
    }

export default addUserItem;

