import { authHeaders } from "../Utils/ploomesCredentials";
import { handleStatus } from "../Utils/handleStatus";
import * as dotenv from "dotenv";

dotenv.config()

const getPloomesId = async (isVerifyEmail: boolean, param: string) => {
  const filter = isVerifyEmail ? `Email eq '${param}'` : `Id eq ${param}`
  const url = `${process.env.BASEURL}/Users?$top=1&$select=Id&$filter=${filter}`;  
const response = await fetch(url, {
      method: "GET",
      headers: authHeaders, 
    });

    if(response.ok){
      const data =  await response.json();
      return data.value.length > 0
       ? data.value[0].Id 
       : 0;
    }
    return handleStatus(response.status, await response.text())
    }

export default getPloomesId;

