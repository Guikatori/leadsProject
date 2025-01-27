import { handleStatus } from "../Utils/handleStatus";
import { authHeaders } from "../Utils/ploomesCredentials";
import * as dotenv from "dotenv";
import { dealPayload } from "./dealPayload";

dotenv.config()

const createDeal = async (contactDb, ownerId, contactId) => {
    const url = `${process.env.BASEURL}/Deals`;
    const response = await fetch(url, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify(dealPayload(contactDb, ownerId, contactId))
       
    });
    const data = await response.json();
    return response.ok ? data : handleStatus(response.status, await response.text())
    }

export default createDeal;
