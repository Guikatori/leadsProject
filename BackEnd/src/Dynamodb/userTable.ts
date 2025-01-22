import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import client from "./awsClient"
import { v4 as uuidv4 } from "uuid";


const addUserItem = async(formData: {name: string; email: string; phone: string; password: string}) => {
    const params ={
        TableName: "LeadsPicker",
        Item: {
            Id: {S: uuidv4()},
            name: {S: formData.name},
            email: {S: formData.email},
            phone: {S: formData.phone},
        }
    }
    try {
        const result = await client.send(new PutItemCommand(params));
        console.log("item inserido", result)
    }catch(error){
        console.error("Error ao inserir o novo item", error)
    }
}

export default addUserItem;