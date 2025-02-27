import { Link } from "react-router-dom";
import sunhub from "../assets/sunhubbr_logo.jpg";
import "./Login.css";
import ButtonTemplate from "../components/ButtonTemplate";
import InputTemplate from "../components/InputTemplate";
import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { localItens, removeLocalItens } from "../utils/localItens";

function LoginPage() {
  const navigate = useNavigate();
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [isVisible, setisVisible] = useState(false);

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
          value={loginEmail} onChange={(e) => setloginEmail(e.target.value)}  class="input" minLength={5} maxLength={100}/>
          <div style={{display: 'flex'}}>
          <InputTemplate id="Senha" name="Senha" placeholder="Insira Sua Senha" type={!isVisible ? 'password' : 'text'} 
            value={loginPassword} onChange={(e) => setloginPassword(e.target.value)} class="input"  minLength={5} maxLength={100}/>
          <IconButton  onClick={()=> setisVisible(!isVisible)} type="button" style={{ position: "absolute", marginTop: '40px', marginLeft: "320px"}}>{!isVisible ? <VisibilityOff /> : <Visibility />}</IconButton>
          </div>
        </div>
        <ButtonTemplate name="Login" formsSubmit={true}/>
      </div>
      <ToastContainer stacked />
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
    
  const response = await axios.post("http://localhost:3000/login", loginData,  {validateStatus: (status) => status < 500});
  if(response.status === 200){
    const data = response.data.body;
    localItens(data.key, data.ploomesId, loginEmail)
    toast.success("Logando", {position: "top-right",theme: "colored"}) 
    navigate('/Leads');
    return
  }
  console.log(`Erro na Verificação da conta ${response.statusText}`);
  removeLocalItens()
  return toast.error("Login ou Senha está Incorreto", {position: "top-right",theme: "colored"})
  }


export default LoginPage;

