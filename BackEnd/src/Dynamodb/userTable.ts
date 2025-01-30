import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import client from "./awsClient"
import makeHash from "../Utils/makeHash";
import {v4 as uuidv4} from 'uuid';

const addUserItem = async (formData: { name: string; email: string; phone: string; password: string; ploomesId: string }) => {

    const passwordHash = makeHash(formData.email, formData.password)
    const tokenHash = makeHash(formData.email,passwordHash )
    const params = {
        TableName: "UserLeads",
        Item: {
            UserId: { S: uuidv4()},
            UserType: {S: 'User'},
            createdAt: {S: new Date().toString()},
            ploomesId: { N: (formData.ploomesId).toString() },
            name: { S: formData.name },
            email: { S: formData.email },
            phone: { S: formData.phone },
            password: { S: passwordHash },
            userKey: {S: tokenHash},
            leadsRemaining: {N: "10"}
        }
    }
    try {
        console.log(params)
        const result = await client.send(new PutItemCommand(params));
        return {statusCode: 200, data: {key: tokenHash, IdPloomes: formData.ploomesId}}
    } catch (error) {
        return {statusCode: error.$metadata?.httpStatusCode || 500, data: [], error: error.message}}
    }

export default addUserItem;

