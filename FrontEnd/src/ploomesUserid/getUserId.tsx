import React from "react";
import { authHeaders, userUrl } from "./credentials";
import { handleStatus } from "../utils/handleStatusCode";
import * as dotenv from "dotenv";

dotenv.config()

const getPloomesId = async (email: string) => {
  const url = `${process.env.BASEURL}?$top=1&$select=Id&$filter=Email eq '${email}'`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: authHeaders, 
    });

    const requestSucess = handleStatus(response.status, await response.text())

    if(requestSucess){
      const data = await response.json();
      if (data.value.length > 0) {
          return data.value[0].Id.toString();
    }if(!requestSucess){
      return null;
    }}
};

export default getPloomesId;
