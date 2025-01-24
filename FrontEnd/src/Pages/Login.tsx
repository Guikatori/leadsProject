import { Link } from "react-router-dom";
import sunhub from "../assets/sunhubbr_logo.jpg";
import "./Login.css";
import ButtonTemplate from "../components/ButtonTemplate";
import InputTemplate from "../components/InputTemplate";
import Warning from '../components/warningTemplate';
import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function LoginPage() {
  const navigate = useNavigate();
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");

  return (
    <>
      <div>
        <img src={sunhub} className="logo" alt="Sunhub" />
      </div>
      <h1 className="Title">Lead Picker</h1>
      <form onSubmit={async (e) =>  loginConfirm(e, loginEmail, loginPassword, navigate)}>
      <div>
        <div className="inputLine">
          <InputTemplate id="Login" name="Login" placeholder="Insira Seu Email" type="email" 
          value={loginEmail} onChange={(e) => setloginEmail(e.target.value)}  class="input"/>
          
          <InputTemplate id="Senha" name="Senha" placeholder="Insira Sua Senha" type="password" 
            value={loginPassword} onChange={(e) => setloginPassword(e.target.value)} class="input"/>
        </div>
        <ButtonTemplate name="Login" formsSubmit={true}/>
      </div>
      <p className="greyText">
        Não possui uma conta? <Link to="/register" className="register">Registre-se</Link>
      </p>
      </form>
    </>
  );
}

const loginConfirm = async (
  e: React.FormEvent<HTMLFormElement>, 
  loginEmail: string,
  loginPassword: string,
  navigate: (path: string) => void
) => {
  e.preventDefault();   const loginData = {
    loginEmail, 
    loginPassword
  }

  console.log(loginEmail)
    const response = await axios.post("http://localhost:3000/login", loginData);
    return response.status === 200 ?  navigate("/Leads") :  console.log(`Erro na Verificação da conta ${response.statusText}`)
  }

export default LoginPage;
