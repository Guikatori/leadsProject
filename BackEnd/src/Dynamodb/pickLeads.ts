import { ScanCommand } from "@aws-sdk/client-dynamodb";
import client from "./awsClient"
import createContact from "../PloomesDeals/createContact"


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
    console.error(
      `Mensagem de erro: ${error.message}, Código de status: ${error.$metadata?.httpStatusCode}`);
    return {
      statusCode: error.$metadata?.httpStatusCode || 500,
      data: [],
      error: error.message, 
    };
  }
};


const createLead = async () => {
  //por enquanto para não dar erro passarei assim 
  const contactDb = {
    Name: "string",
    Address: "string",
    TypeId: 2,
    Phone: "string"
};

  const contactData =  await createContact(contactDb)
  console.log(contactData)
}

export default pickLeads;
