import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import client from "./awsClient"
import makeHash from "../Utils/makeHash";

const addUserItem = async(formData: {name: string; email: string; phone: string; password: string}) => {
    
    const passwordHash = makeHash(formData.password)

    const params ={
        TableName: "LeadsPicker",
        Item: {
            Id: {S: '1'},
            name: {S: formData.name},
            email: {S: formData.email},
            phone: {S: formData.phone},
            password: {S: passwordHash}
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