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

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();


  return (
    <>
    <div className='box'>
      <div className='forms'>
      <h1 className="Title">Lead Picker</h1>
      <form onSubmit={async (e) =>  handleSubmit(e, name, email, phone, password, confirmPassword, navigate)}>
      <div>
        <div className="inputLine">
          <InputTemplate
            id="name"
            placeholder="Insira Seu Nome Completo"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            class="input"
          />
          <InputTemplate
            id="email"
            placeholder="Insira Seu Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            class="input"
          />

          <MaskInput
            id="phone"
            placeholder="Insira Seu Telefone"
            mask="(__) _____-____"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <InputTemplate
            id="password"
            placeholder="Insira Uma Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            class="input"
          />
          <InputTemplate
            id="passwordConfirm"
            placeholder="Confirme a Senha"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            class="input"
          />
        </div>
        <ButtonTemplate name="Registre-Se"  formsSubmit={true} />
      </div>
      </form>
    </div>
    <div className='imageContainer'>
      <img className='Mapimg' src={map} alt='map'/>
    </div>
    </div>
    </>
  );
}

  
const inputValuesConfirm = (name: string, email: string, phone: string, password: string, confirmPassword: string) => {
  return name && email && phone && password && confirmPassword;
};

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
    alert('As senhas não Correspondem');
    return;
  }

  const responsePloomesId = await axios.post('http://localhost:3000/ploomesId', { email });
  const ploomesId = responsePloomesId ? responsePloomesId.data.ploomesId : null;

  const formData = {
    name,
    email,
    phone,
    password,
    ploomesId,
  };

  if (!inputValuesConfirm(name, email, phone, password, confirmPassword)) {
    alert('Preencha todos os dados');
    return;
  }

  const response = await axios.post('http://localhost:3000/add-user', formData);
  const requestSuccess = handleStatus(response.status, JSON.stringify(response.data));
  return requestSuccess
    ? navigate('/Leads')
    : console.log(`Erro na Verificação da conta: ${response.statusText}`);
};


export default RegisterPage;
