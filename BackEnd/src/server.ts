import express from "express";
import cors from "cors";
import addUserItem from "./Dynamodb/userTable";
import pickLeads from "./Dynamodb/pickLeads";
import LoginConfirmation from "./Dynamodb/LoginConfirmation"
import getPloomesId from "./PloomesDeals/ploomesId";
import * as dotenv from "dotenv";
import e from "cors";
import { createLeads } from './PloomesDeals/createLead'
import getEmailConfirm  from './Dynamodb/getEmailConfirm'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())

app.post("/add-user", async (req, res) => {
  const response = await addUserItem(req.body);
  if (response.statusCode === 200) {
    return res.status(200).json({ message: "usuario registrado", data: response })
  }
  return res.status(400).json({ message: "usuario não registrado" });
})

app.post("/leadsPicker", async (req, res) => {
  const { country, limit } = req.body;
  if (!country || !limit) {
    res.status(400).json({ message: "country e limit são obrigatórios." });
    return;
  }

  const response = await pickLeads(country, parseInt(limit, 10))

  if (response.statusCode === 200) {
    res.status(200).json({ message: "Leads encontrados", leads: response.data });
    await createLeads(response.data);
    return;
  } if (response.statusCode === 404) {
    return res.status(404).json({ message: "Nenhum lead encontrado" });
  } if (response.statusCode === 500) {
    return res.status(500).json({ message: "Erro ao buscar leads", error: response.error });
  }
  return res.status(500).json({ message: "Erro inesperado" });
}
);

app.post("/login", async (req, res) => {
  const { loginEmail, loginPassword } = req.body;

  if (!loginEmail || !loginPassword) {
    return res.status(400).json({ message: "email e senha são obrigatórios." });
  }
  const result = await LoginConfirmation(loginEmail, loginPassword);
  if (result) {
    return res.status(200).json({ message: "Login Encontrado" })
  }
  return res.status(401).json({ message: "Erro ao Achar Conta" });
});

app.post("/ploomesId", async (req, res) => {
  const ploomesId = await getPloomesId(req.body.email);
  if (ploomesId) {
    return res.status(200).json({ message: "Id Encontrado", data: ploomesId, })
  }
  return res.status(404).json({ message: "Id Não Encontrado", data: null });
})

app.post("/emailConfirmation", async (req, res) =>{
  const hasEmail = await getEmailConfirm(req.body.email);
  return hasEmail ? res.status(401).json({ message: "Email já existe"}) : res.status(200).json({ message: "Email não está sendo utilizado"})
})

app.listen(process.env.PORT, () => {
  console.log('servidor rodando')
})