import { QueryCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import client from "./awsClient"


const pickLeads = async (country: string, limit: number) => {
    const params = {
        TableName: "Lead", 
        FilterExpression: "IsPicked = :ispicked AND Country = :country ",
        ExpressionAttributeValues: {
          ":country": { S: country },
          ":ispicked" :{BOOL: false}  
        },
    };
    try{
        const result = await client.send(new ScanCommand(params));
        console.log(JSON.stringify(result.Items, null, 2))
        let limitItens = []
        let i = 0
        for(let itens in result.Items){
            limitItens.push(itens)
             i < limit ? limitItens : i++
        }
        
        console.log(limitItens)
        return {statusCode: 200, data: limitItens}
    } 
     catch (error) {
      console.log(`Mensagem de erro: ${error.message}, Código de status: ${error.$metadata?.httpStatusCode}`);
      return {statusCode: error.$metadata?.httpStatusCode || 500, data: [], error: error.message}}
};

export default pickLeads;
