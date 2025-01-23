import { ScanCommand } from "@aws-sdk/client-dynamodb";
import client from "./awsClient"
import makeHash from "../Utils/makeHash"; 


const LoginConfirmation = async (Email: string, Password: string) => {

    const confirmPassword =  makeHash(Email,Password)

    const params = {
        TableName: "LeadsPicker", 
        Limit: 1, 
        FilterExpression: "email = :email AND password = :password",
        ExpressionAttributeValues: {
          ":email": { S: Email },  
          ":password": { S: confirmPassword },  
        },
    };
    
    const result = await client.send(new ScanCommand(params));
    
    if(result.Items && result.Items.length > 0){    
        return true;
    }else{
        return false;
    }
};

export default LoginConfirmation;
