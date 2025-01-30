import express from "express";
import cors from "cors";
import addUserItem from "./Dynamodb/userTable";
import pickLeads from "./Dynamodb/pickLeads";
import LoginConfirmation from "./Dynamodb/LoginConfirmation"
import getPloomesId from "./PloomesDeals/ploomesId";
import * as dotenv from "dotenv";
import e from "cors";
import { createLeads } from './PloomesDeals/createLead'
import { verifyToken, getUser } from "./Dynamodb/verifyAuth"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())

app.post("/add-user", async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "Possui dados Faltantes" })
  }
  const response = await addUserItem(req.body);
  if (response.statusCode === 200) {
    return res.status(200).json({ message: "usuario registrado", body: response })
  }
  return res.status(response.statusCode).json({ message: response.error });
})

app.post("/leadsPicker", async (req, res) => {
  const { country, limit, ploomesId } = req.body;
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Token não encontrado." });
  }
  if (!country || !limit || !ploomesId) {
    return res.status(400).json({ message: "Dados Faltantes" });
  }
  const token = authHeader.split(" ")[1];
  if(!token){
    return res.status(400).json({ message: "Token não Encontrado." });
  }
  const tokenIsValid = await verifyToken(token)
  if (!tokenIsValid) {
    return res.status(401).json({ message: "Token não é válido." });
  }

  const ploomesIdIsValid = await getPloomesId(false, ploomesId);

  if(!ploomesIdIsValid){
    return res.status(401).json({message: "Ploomes id Inválida"})
  }

  const response = await pickLeads(country, parseInt(limit, 10))
  if (response.statusCode === 200) {
    res.status(200).json({ message: "Leads encontrados", leads: response.data });
    await createLeads(response.data, ploomesId);
    return;
  }
  return res.status(response.statusCode).json({ message: response.error });
});

app.post("/login", async (req, res) => {
  const { loginEmail, loginPassword } = req.body;
  if (!loginEmail || !loginPassword) {
    return res.status(400).json({ message: "email e senha são obrigatórios." });
  }
  const result = await LoginConfirmation(loginEmail, loginPassword);
  if (result !== null) {
    const ploomesId = result.Items[0].ploomesId.N,
      token = result.Items[0].userKey.S,
      leadsRemaining = result.Items[0].leadsRemaining.N
    return res.status(200).json({ message: "Login Encontrado", body: { ploomesId: ploomesId, key: token, leadsRemaining: leadsRemaining } })
  }
  return res.status(401).json({ message: "Erro ao Achar Conta" });
});
app.post("/ploomesId", async (req, res) => {
  const ploomesId = await getPloomesId(true, req.body.email);
  if (ploomesId) {
    return res.status(200).json({ message: "Id Encontrado", data: ploomesId, })
  }
  return res.status(400).json({ message: "Ploomes Id não foi encontrado", data: null });
})


app.post("/emailConfirmation", async (req, res) => {
  const hasEmail = await getUser(req.body.email);
  return hasEmail ? res.status(409).json({ message: "Email já existe" }) : res.status(200).json({ message: "Email não está sendo utilizado" })
})

app.get("/verifyToken", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(400).json({ message: "Token não fornecido" })
  }
  const token = authHeader.split(" ")[1];
  const tokenIsValid = await verifyToken(token)
  return tokenIsValid ? res.status(200).json({ message: "Token Válido" }) : res.status(401).json({ message: "Token Inválido" })
})


app.listen(process.env.PORT, () => {
  console.log('servidor rodando')
})