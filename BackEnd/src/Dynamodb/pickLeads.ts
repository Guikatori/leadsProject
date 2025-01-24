import { ScanCommand } from "@aws-sdk/client-dynamodb";
import client from "./awsClient"


const pickLeads = async (country: string, limit: number) => {
    const params = {
        TableName: "Leads", 
        Limit: limit, 
        FilterExpression: "Country = :country",
        ExpressionAttributeValues: {
          ":country": { S: country }  
        },
    };
    try{
        const result = await client.send(new ScanCommand(params));
        return {statusCode: 200, data: result.Items}
    } 
     catch (error) {
      console.log(`Mensagem de erro: ${error.message}, Código de status: ${error.$metadata?.httpStatusCode}`);
      return {statusCode: error.$metadata?.httpStatusCode || 500, data: [], error: error.message}}
};

export default pickLeads;
