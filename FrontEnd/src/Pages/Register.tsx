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
  
  const inputValuesConfirm = ()=>{
    return name && email && phone && password && confirmPassword ? true : false
    }

  const handleSubmit = async () => {
    if(password !== confirmPassword){
      alert("As senhas não Correspondem")
      return;
    }

    const ploomesId = await axios.post();    
    
    const formData = {
      name,
      email,
      phone,
      password,
      ploomesId,
    };


    if (!inputValuesConfirm()) {
      alert("Preencha todos os dados");
      return;
    }
      const response = await axios.post("http://localhost:3000/add-user", formData)
      const requestSucess = handleStatus(response.status, JSON.stringify(response.data))
      return requestSucess ?  navigate("/Leads") : console.log(`Erro na Verificação da conta: ${response.statusText}`)
  }

  return (
    <>
    <div className='box'>
      <div className='forms'>
      <h1 className="Title">Lead Picker</h1>
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
        <ButtonTemplate name="Registre-Se" onclick={handleSubmit} />
      </div>
    </div>
    <div className='imageContainer'>
      <img className='Mapimg' src={map} alt='map'/>
    </div>
    </div>
    </>
  );
}

export default RegisterPage;
