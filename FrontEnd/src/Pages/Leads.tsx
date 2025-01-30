import React, { useEffect, useState } from "react";
import SidebarExample from "../components/sidebar";
import "./Leads.css";
import InputTemplate from "../components/InputTemplate";
import ButtonTemplate from "../components/ButtonTemplate";
import SelectTemplate from "../components/selectTemplate";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Leads = () => {
  const navigate = useNavigate();
  const [leadsNumber, setLeadsNumber] = useState(0);
  const [country, setCountry] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthentication = async () => {
    const isValid = await validateToken(navigate);
    setIsAuthenticated(isValid);
  };

  useEffect(() => {
        checkAuthentication(); 
  }, [navigate]);

  return isAuthenticated ? (
    <div style={{ display: "flex", width: "90vw", height: "90vh" }}>
      <SidebarExample />
      <ToastContainer stacked />
      <div className="forms-container">
        <h1 className="title">Gerar Leads</h1>
        <div className="form-content">
          <div className="form-row">
            <div className="form-item">
              <InputTemplate
                id="leadsNumber"
                placeholder="Quantidade de Leads"
                type="number"
                value={leadsNumber > 10 ? "10" : leadsNumber.toString()}
                onChange={(e) => setLeadsNumber(parseInt(e.target.value, 10))}
                class="leadInput"
                min={1}
                max={10}
              />
            </div>
            <div className="form-item">
              <SelectTemplate
                options={["PR", "SP", "RJ"]}
                onChange={(value) => setCountry(value)}
              />
            </div>
          </div>
          <div className="form-button">
            <ButtonTemplate name="Gerar" onclick={() => createLeadHandleSubmit(leadsNumber, country)} />
          </div>
        </div>
      </div>
    </div>
  )
    : <h1>Teste</h1>
};

const createLeadHandleSubmit = async (leadsNumber: number, country: string) => {
  const key = localStorage.getItem('Key')
  const ploomesId = Number(localStorage.getItem('ploomesId'))
  console.log(typeof(ploomesId))
  if(!ploomesId){
    toast.error("PloomesId não encontrado", {position: "top-right",theme: "colored"})
    return
  }
  const leadsData = {
    country,
    limit: leadsNumber > 10 ? 10 : leadsNumber,
    ploomesId
  };
  const response = await axios.post("http://localhost:3000/leadsPicker", leadsData, { headers: { Authorization: `Bearer ${key}` }, validateStatus: (status) => status < 500 });
  return response.status === 200 ? console.log("Leads gerados com sucesso:", response.data)
    : console.log(`Leads não foram Gerados, Error ${response.status}`)
};

const validateToken = async (navigate: (path: string) => void) => {
  const key = localStorage.getItem('Key')
  if (!key) {
    navigate("/")
    return false
  }                                                                      //por algum motivo do axios, o bearer nao pode vir como segundo parametro
  const response = await axios.post("http://localhost:3000/verifyToken", {}, { headers: { Authorization: `Bearer ${key}` }, validateStatus: (status) => status < 500 })
  if (response.status === 200) {
    return true
  }
  console.log(`UserKey não encontrada ${response.statusText}`);
  navigate("/")
  return false
}

export default Leads;
