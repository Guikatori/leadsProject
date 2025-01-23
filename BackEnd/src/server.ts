import express from "express";
import cors from "cors";
import addUserItem from "./Dynamodb/userTable";
import pickLeads from "./Dynamodb/pickLeads";
import LoginConfirmation from "./Dynamodb/LoginConfirmation"
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

app.post("/leadsPicker", async (req, res) => {
    const { country, limit } = req.body; 

    if (!country || !limit) {
      res.status(400).json({ message: "country e limit são obrigatórios." });
      return;
    }
  
    await pickLeads(country, parseInt(limit, 10)) 
    try {
      res.status(200).json({ message: "Leads encontrados"});
      }
    catch{
        res.status(500).json({ message: "Erro ao buscar leads" });
      }}
    );
  


app.post("/login", async (req, res)=>{
  const { email, password } = req.body; 

  if (!email || !password) {
    res.status(400).json({ message: "email e senha são obrigatórios." });
    return;
  }
  try{
    const result =  await LoginConfirmation(email,password );
    res.status(200).json({message: "Login Encontrado"})
   }catch{
    res.status(500).json({ message: "Erro ao Achar Conta" });
   }  
});




app.listen(process.env.PORT, () => {
    console.log('servidor rodando')
})