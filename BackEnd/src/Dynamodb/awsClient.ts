import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import * as dotenv from "dotenv";
 

dotenv.config({ path: "C:\Users\guilherme.catori\Documents\leadsPicker\leadsPicker\.env" });

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_REGION){
    throw new Error("As variáveis de ambiente não estão definidas.");
}

const awsClient = new DynamoDBClient({
    region : process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

export default awsClient;