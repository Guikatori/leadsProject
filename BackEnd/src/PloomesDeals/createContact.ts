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
    const data = await response.json();
    return response.ok ? data.value[0].Id : handleStatus(response.status, await response.text())
  }

export default createContact;
