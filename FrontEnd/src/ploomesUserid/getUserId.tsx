import React from "react";
import { authHeaders, userUrl } from "./credentials";

const getPloomesId = async (email: string) => {
    const url = `${userUrl}?$top=1&$select=Id&$filter=Email eq '${email}'`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: authHeaders, 
    });

    if (!response.ok) {
      console.error(`Erro na requisição: ${response.status}`);
      return '';
    }
    const data = await response.json();

    if (data.value && data.value.length > 0 && data.value[0].Id !== undefined) {
        return data.value[0].Id.toString();
  } 
     else {
    console.error("Nenhum resultado encontrado para o email fornecido.");
        return '';
  }
};

export default getPloomesId;
