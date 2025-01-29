import express from "express";
import cors from "cors";
import addUserItem from "./Dynamodb/userTable";
import pickLeads from "./Dynamodb/pickLeads";
import LoginConfirmation from "./Dynamodb/LoginConfirmation"
import getPloomesId from "./PloomesDeals/ploomesId";
import * as dotenv from "dotenv";
import e from "cors";
import { createLeads } from './PloomesDeals/createLead'
import getEmailConfirm from './Dynamodb/getEmailConfirm'
import { generatorToken, generateRefreshToken, verifyToken } from "./Auth/authToken";

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
    const accessToken = generatorToken(email, "user"),
         refreshToken = generateRefreshToken(email);
    res.status(200).json({ message: "usuario registrado", body: {user: response, acessToken: accessToken, refreshToken: refreshToken}})
  }
  return res.status(response.statusCode).json({ message: response.error });
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
    const accessToken = generatorToken(loginEmail, "user"),
      refreshToken = generateRefreshToken(loginEmail),
      ploomesId = result.Items[0].ploomesId.S
    return res.status(200).json({ message: "Login Encontrado", body: { token: accessToken, refreshToken: refreshToken, ploomesId: ploomesId } })
  }
  return res.status(401).json({ message: "Erro ao Achar Conta" });
});

app.post("/ploomesId", async (req, res) => {
  const ploomesId = await getPloomesId(req.body.email);
  if (ploomesId) {
    return res.status(200).json({ message: "Id Encontrado", data: ploomesId, })
  }
  return res.status(400).json({ message: "Ploomes Id não foi encontrado", data: null });
})


app.post("/emailConfirmation", async (req, res) => {
  const hasEmail = await getEmailConfirm(req.body.email);
  return hasEmail ? res.status(409).json({ message: "Email já existe" }) : res.status(200).json({ message: "Email não está sendo utilizado" })
})

app.post("/refresh", async (req, res) => {
  const { refreshToken, email } = req.body
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token está faltando' });
  }
  const refreshTokenIsValid = verifyToken(refreshToken, "refresh-secret-key")
  if (refreshTokenIsValid) {
    const newToken = generatorToken(email, "User");
    return res.status(200).json({ message: "Novo Token", data: newToken})
  }    
  return res.status(500).json({ message: "Refresh token inválido"})

})

app.post("/validateToken", async (req, res) => {
  console.log("validateToken")
  const token = req.body.token
  if (!token) {
    return res.status(400).json({ message: 'Token está faltando' })
  }
  const validToken = verifyToken(token, "access-secret-key")
  console.log(validToken)
  if (validToken) {
    return res.status(200).json({ message: "Token Válido" })
  }
  return res.status(401).json({ message: "Token Inválido" })
})

app.listen(process.env.PORT, () => {
  console.log('servidor rodando')
})