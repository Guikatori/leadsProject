import React, { useState } from "react";
import SidebarExample from "../components/sidebar";
import "./Leads.css";
import InputTemplate from "../components/InputTemplate";
import ButtonTemplate from "../components/ButtonTemplate";
import SelectTemplate from "../components/selectTemplate";
import axios from "axios";

const Leads = () => {
  const [leadsNumber, setLeadsNumber] = useState(0);
  const [country, setCountry] = useState("");

  return (
    <div style={{ display: "flex", width: "90vw", height: "90vh" }}>
      <SidebarExample />

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
  )};

const createLeadHandleSubmit = async (leadsNumber: number, country: string) => {
  const leadsData = {
    country,
    limit: leadsNumber > 10 ? 10 : leadsNumber
  };
  const response = await axios.post("http://localhost:3000/leadsPicker", leadsData);
  return response.status === 200 ? console.log("Leads gerados com sucesso:", response.data)
    : console.log(`Leads não foram Gerados, Error ${response.status}`)
};

export default Leads;
