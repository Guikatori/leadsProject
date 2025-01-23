import { PutItemCommand, ScanCommand  } from "@aws-sdk/client-dynamodb";
import client from "./awsClient"
import makeHash from "../Utils/makeHash";

const addUserItem = async(formData: {name: string; email: string; phone: string; password: string; ploomesId: string}) => {
    
    const passwordHash = makeHash(formData.email, formData.password)
    const id = await nextId()

    const params ={
        TableName: "LeadsPicker",
        Item: {
            Id: {S: id.toString()},
            ploomesId: {S: formData.ploomesId},
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

const nextId = async ()=>{
    let id: number = 0;
    const scanParams  = {
        TableName: "LeadsPicker",
        Select: "COUNT" as const,
    }

    const scanResult = await client.send(new ScanCommand(scanParams))

    if (scanResult.Count !== undefined) {
        const itemCount = scanResult.Count;
        id = itemCount + 1; 
        console.log(id)
    } else {
        console.log("Erro ou resultado inválido: Count não definido.");
    }

    return id;
}


export default addUserItem;