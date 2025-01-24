import { PutItemCommand, ReturnItemCollectionMetrics, ScanCommand } from "@aws-sdk/client-dynamodb";
import client from "./awsClient"
import makeHash from "../Utils/makeHash";

const addUserItem = async (formData: { name: string; email: string; phone: string; password: string; ploomesId: string }) => {

    const passwordHash = makeHash(formData.email, formData.password)
    const id = await nextId()
    const userId = (parseInt(id, 10) + 1).toString()
    const params = {
        TableName: "LeadsUser",
        Item: {
            UserId: { N: userId },
            ploomesId: { S: formData.ploomesId },
            name: { S: formData.name },
            email: { S: formData.email },
            phone: { S: formData.phone },
            password: { S: passwordHash },
            createdAt: {S: new Date().toString()}
        }
    }
    try {
        const result = await client.send(new PutItemCommand(params));
        console.log("item inserido", result)
    } catch (error) {
        console.error("Error ao inserir o novo item", error)
    }
}
export default addUserItem;


const nextId = async () => {

    const scanParams = {
        TableName: "LeadsUser",

        ScanIndexForward: false,
        Limit: 1
    }
    try {
        const scanResult = await client.send(new ScanCommand(scanParams))

        if (scanResult.Items.length > 0) {
            const firstItem = scanResult.Items[0];
            return firstItem.UserId.N;
        }
    }
    catch (error) {
        console.log(`error: ${error.text}, status: ${error.status}`)
        return null
    }
}
