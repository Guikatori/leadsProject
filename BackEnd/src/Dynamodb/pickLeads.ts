import { ScanCommand } from "@aws-sdk/client-dynamodb";
import client from "./awsClient"
    
const pickLeads = async (country: string, limit: number) => {
    const params = {
        TableName: "Leads", 
        Limit: limit, 
        FilterExpression: "isPicked = :isPicked AND Country = :country",
        ExpressionAttributeValues: {
          ":country": { S: country },  
        },
    };
    
    try {
        const result = await client.send(new ScanCommand(params));
    
        return result.Items || [];
    } catch (error) {
        console.error("Erro ao buscar leads:", error);
        throw error;
    }
    };

export default pickLeads;
