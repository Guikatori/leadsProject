import { handleStatus } from "../Utils/handleStatus";
import * as dotenv from "dotenv";
import { contactPayload } from "./contactPayload";

dotenv.config()

const authHeaders = {'Authorization' : `Bearer `, 'User-Key' :""}

const createContact = async () => {
    const url = `https://api2.ploomes.com/Contacts`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify(contactPayload())
       
    });
    const responseText = await response.text();


    const requestSucess = handleStatus(response.status, responseText)

    if(requestSucess){
      const data = JSON.parse(responseText);
      return data
};
}
export default createContact;
