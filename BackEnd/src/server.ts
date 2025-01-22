import express from "express";
import cors from "cors";
import addUserItem from "./Dynamodb/userTable";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())

app.post("/add-user", async (req, res)=>{
    try {
        const result = await addUserItem(req.body);
        res.status(200).json({message: "usuario registrado"})
    }catch(error){
        res.status(500).json({message: "usuario não registrado"});
    }
})

app.listen(process.env.PORT, () => {
    console.log('servidor rodando')
})