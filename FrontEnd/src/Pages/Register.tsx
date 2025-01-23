import React, { useState } from 'react';
import './Register.css';
import ButtonTemplate from '../components/ButtonTemplate';
import InputTemplate from '../components/InputTemplate';
import MaskInput from '../components/inputWithMask';  
import map from '../assets/4710388-mapa-do-brasil-sobre-fundo-branco-gratis-vetor.jpg'
import axios from "axios";
import getPloomesId from "../ploomesUserid/getUserId.tsx"
import { handleStatus } from '../utils/handleStatusCode.tsx';
import { Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState(''); /*Senha pode ser de qualquer tamanho ? */
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

   /*
     *  if (x){ ... } 
     *   return
     * 
     *  EM situações sem demais condições
     */
  
  const inputValuesConfirm = ()=>{
    if(name && email && phone && password && confirmPassword){
      return true
    }else{
      return false
    }}
 
    
  const handleSubmit = async () => {

    /*
    Pop-up?
    */
    if(password !== confirmPassword){
      alert("As senhas não Correspondem")
      return;
    }

    const ploomesId = await getPloomesId(email);    
    
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
      if(requestSucess){
        navigate("/Leads");
      }

      /*caso contrário..? */
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
