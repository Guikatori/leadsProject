import { authHeaders } from "../Utils/ploomesCredentials";
import { handleStatus } from "../Utils/handleStatus";
import * as dotenv from "dotenv";

dotenv.config()

const getPloomesId = async (email: string) => {
  const url = `${process.env.BASEURL}/Users?$top=1&$select=Id&$filter=Email eq '${email}'`;
const response = await fetch(url, {
      method: "GET",
      headers: authHeaders, 
    });

    if(response.ok){
      const data =  await response.json();
      console.log(data)
      return data.value.length > 0
       ? data.value[0].Id.toString() 
       : null;
    }
    return handleStatus(response.status, await response.text())
    }

export default getPloomesId;
