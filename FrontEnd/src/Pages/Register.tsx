import React, { useState } from 'react';
import './Register.css';
import ButtonTemplate from '../components/ButtonTemplate';
import InputTemplate from '../components/InputTemplate';
import MaskInput from '../components/inputWithMask';
import map from '../assets/4710388-mapa-do-brasil-sobre-fundo-branco-gratis-vetor.jpg'
import axios from "axios";
import { handleStatus } from '../utils/handleStatusCode.tsx';
import { Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState('eyeoff')
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
                  type={type}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  class="input"
                  minLength={5}
                  maxLength={50}
                  />
                  <span onClick={() => eyeHandle(type,setIcon, setType)} style={{position: 'fixed', marginLeft:'340px', marginTop: '22px'}}><Icon icon={icon} size={25}/></span>
                 </div>
                <div style={{display: "flex"}}>
                <InputTemplate
                  id="passwordConfirm"
                  placeholder="Confirme a Senha"
                  type={type}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  class="input"
                  minLength={5}
                  maxLength={50}
                />
                <span onClick={() => eyeHandle(type,setIcon, setType)} style={{position: 'fixed', marginLeft:'340px', marginTop: '22px'}}><Icon icon={icon} size={25}/></span>
                </div>
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

type iconType = React.Dispatch<React.SetStateAction<string>>
const eyeHandle = (type: string, setIcon: iconType, setType: iconType):void =>{
  if(type === 'password'){
    setIcon(eye);
    setType('text')
    return;
  }
  setIcon(eyeOff)
  setType('password')
  return;
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

  if(hasEmail.status === 401){
    return toast.error("Email já foi utilizado", {position: "top-right", theme: "colored"})
  }

  const responsePloomesId = await axios.post('http://localhost:3000/ploomesId', { email }, {validateStatus: (status) => status < 500});
  let ploomesId = responsePloomesId.status === 200 ? responsePloomesId.data.data  : "null" 

  const formData = {
    name,
    email,
    phone,
    password,
    ploomesId,
  };

  const response = await axios.post('http://localhost:3000/add-user', formData);
  const requestSuccess = handleStatus(response.status, JSON.stringify(response.data));

  if(requestSuccess){
    navigate('/Leads');
    return toast.success('Registro feito com sucesso!', {theme: "colored", position: "top-right"})
}
    console.log(`Erro na Verificação da conta: ${response.statusText}`);
    return toast.error("Erro na Verificação da conta", {position: "top-right",theme: "colored"})
};

export default RegisterPage;
