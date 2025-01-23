import { ScanCommand } from "@aws-sdk/client-dynamodb";
import client from "./awsClient"
import makeHash from "../Utils/makeHash"; 

const LoginConfirmation = async (Email: string, Password: string) => {

    const confirmPassword =  makeHash(Email,Password)
    console.log(confirmPassword)
    console.log(Email)

    const params = {
        TableName: "LeadsPicker", 
        Limit: 1, 
        FilterExpression: "email = :email AND password = :Password",
        ExpressionAttributeValues: {
          ":email": { S: Email },  
          ":password": { S: confirmPassword },  
        },
    };
    
    try {
        const result = await client.send(new ScanCommand(params));
    
        return result.Items || [];
    } catch (error) {
        console.error("Erro ao procurar Conta:", error);
        throw error;
    }
    };

export default LoginConfirmation;
