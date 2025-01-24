import { handleStatus } from "../Utils/handleStatus";
import { authHeaders } from "../Utils/ploomesCredentials";
import * as dotenv from "dotenv";
import { contactPayload } from "./contactPayload";

dotenv.config()

const createContact = async (contactDb, ownerId) => {
    const url = `${process.env.BASEURL}/Contacts`;
    const response = await fetch(url, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify(contactPayload(contactDb, ownerId))
       
    });
    const responseText = await response.text();


    const requestSucess = handleStatus(response.status, responseText)

    if(requestSucess){
      const data = JSON.parse(responseText);
      return data
}}

export default createContact;
