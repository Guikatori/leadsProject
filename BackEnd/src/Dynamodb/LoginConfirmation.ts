import { ScanCommand } from "@aws-sdk/client-dynamodb";
import client from "./awsClient"
import makeHash from "../Utils/makeHash"; 


const LoginConfirmation = async (Email: string, Password: string) => {

    console.log(Email);
    console.log(Password);


    const hashedPassword =  makeHash(Email,Password)
    if(!hashedPassword){
        ///tratar        
    }


    console.log(hashedPassword);

    const params = {
        TableName: "LeadsPicker", 
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
