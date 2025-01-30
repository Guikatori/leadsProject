import React, { useState } from 'react';
import './Register.css';
import ButtonTemplate from '../components/ButtonTemplate';
import InputTemplate from '../components/InputTemplate';
import MaskInput from '../components/inputWithMask';
import map from '../assets/4710388-mapa-do-brasil-sobre-fundo-branco-gratis-vetor.jpg'
import axios from "axios";
import { handleStatus } from '../utils/handleStatusCode.tsx';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { localItens } from "../utils/localItens";
import { Link } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVisible, setisVisible] = useState(false);
  const navigate = useNavigate();


  return (
    <>
      <div className='box'>
        <div className='forms'>
          <h1 className="Title">Lead Picker</h1>
          <form onSubmit={async (e) => handleSubmit(e, name, email, phone, password, confirmPassword, navigate)}>
            <div>
              <div className="inputLine">
                <InputTemplate
                  id="name"
                  placeholder="Insira Seu Nome Completo"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  class="input"
                  minLength={5}
                  maxLength={100}
                />
                <InputTemplate
                  id="email"
                  placeholder="Insira Seu Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  class="input"
                  minLength={5}
                  maxLength={100}
                  icon={true}
                />

                <MaskInput
                  id="phone"
                  placeholder="Insira Seu Telefone"
                  mask="(__) _____-____"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}                  
                />
                 <div style={{display: 'flex'}}>
                <InputTemplate
                  id="password"
                  placeholder="Insira Uma Senha"
                  type={!isVisible ? "password" : "text"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  class="input"
                  minLength={5}
                  maxLength={50}
                  />
                  <IconButton  onClick={()=> setisVisible(!isVisible)} type="button" style={{ position: "absolute", marginTop: '18px', marginLeft: "320px"}}>{!isVisible ? <VisibilityOff /> : <Visibility />}</IconButton>
                 </div>
                <div style={{display: "flex"}}>
                <InputTemplate
                  id="passwordConfirm"
                  placeholder="Confirme a Senha"
                  type={!isVisible ? "password" : "text"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  class="input"
                  minLength={5}
                  maxLength={50}
                />
                  <IconButton  onClick={()=> setisVisible(!isVisible)} type="button" style={{ position: "absolute", marginTop: '18px', marginLeft: "320px"}}>{!isVisible ? <VisibilityOff /> : <Visibility />}</IconButton>
                </div>
                <p className="greyText">
                 Já possui uma conta? <Link to="/" className="register">Login</Link>
                </p>
              </div>
              <ButtonTemplate name="Registre-Se" formsSubmit={true} />
            </div>
          </form>
        </div>
        <ToastContainer stacked />
        <div className='imageContainer'>
          <img className='Mapimg' src={map} alt='map' />
        </div>
      </div>
    </>
  );
}

const handleSubmit = async (
  e: React.FormEvent,
  name: string,
  email: string,
  phone: string,
  password: string,
  confirmPassword: string,
  navigate: (path: string) => void
) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    return toast.error("As senhas não são iguais", {position: "top-right",theme: "colored"})
  }

  const hasEmail = await axios.post('http://localhost:3000/emailConfirmation', { email }, {validateStatus: (status) => status < 500});

  if(hasEmail.status === 409){
    return toast.error("Email já foi utilizado", {position: "top-right", theme: "colored"})
  }

  const responsePloomesId = await axios.post('http://localhost:3000/ploomesId', { email }, {validateStatus: (status) => status < 500});
  let ploomesId = responsePloomesId.status === 200 ? responsePloomesId.data.data  : 0 

  const formData = {
    name,
    email,
    phone,
    password,
    ploomesId,
  };

  const response = await axios.post('http://localhost:3000/add-user', formData,  {validateStatus: (status) => status < 500});
  const requestSuccess = handleStatus(response.status, JSON.stringify(response.data.body));

  if(requestSuccess){
    const responsebody = response.data.body
    localItens(responsebody.data.key, ploomesId, email)
    toast.success('Registro feito com sucesso!', {theme: "colored", position: "top-right"})
    navigate('/Leads');
    return 
}
    console.log(`Erro na Verificação da conta: ${response.statusText}`);
    return toast.error("Erro na Verificação da conta", {position: "top-right",theme: "colored"})
};

export default RegisterPage;
