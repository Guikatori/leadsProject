import { PutItemCommand, ReturnItemCollectionMetrics, ScanCommand } from "@aws-sdk/client-dynamodb";
import client from "./awsClient"
import makeHash from "../Utils/makeHash";

const addUserItem = async (formData: { name: string; email: string; phone: string; password: string; ploomesId: string }) => {

    const passwordHash = makeHash(formData.email, formData.password)
    const id = parseInt(await nextId(), 10)
    console.log(id)
    const userId = id > 0 ? id + 1 : 1
    const params = {
        TableName: "UserLeads",
        Item: {
            UserId: { N: userId},
            UserType: {S: 'User'},
            createdAt: {S: new Date().toString()},
            ploomesId: { S: formData.ploomesId },
            name: { S: formData.name },
            email: { S: formData.email },
            phone: { S: formData.phone },
            password: { S: passwordHash }

        }
    }
    console.log(params)
    try {
        const result = await client.send(new PutItemCommand(params));
        console.log("item inserido", result)
        return {statusCode: 200, data: result}
    } catch (error) {
        return {statusCode: error.$metadata?.httpStatusCode || 500, data: [], error: error.message}}
    }

export default addUserItem;


const nextId = async () => {

    const scanParams = {
        TableName: "UserLeads",
        FilterExpression: "UserType = :userType",
        ExpressionAttributeValues: {":userType": {S: "User"}},
        ScanIndexForward: false,
        Limit: 10
    }
    try {
        const scanResult = await client.send(new ScanCommand(scanParams))
        if (scanResult.Items.length > 0) {
            const firstItem = scanResult.Items[0];
            console.log(scanResult.Items)
            return firstItem.UserId.N;
        }
    }
    catch (error) {
        console.log(`error: ${error.message}, status: ${error.name}`)
        return null
    }
}
