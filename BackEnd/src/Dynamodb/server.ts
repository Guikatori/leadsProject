import express from "express";
import cors from "cors";
import addUserItem from "./userTable";

const app = express();
app.use(express.json());
app.use(cors())

app.post("/add-user", async (req, res)=>{
    try {
        const result = await addUserItem(req.body);
        res.status(200).json({message: "usuario registrado", result})
    }catch(error){
        res.status(500).json({message: "usuario não registrado"});
    }
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log('servidor rodando')
})