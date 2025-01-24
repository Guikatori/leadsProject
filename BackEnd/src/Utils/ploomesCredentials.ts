import * as dotenv from "dotenv"

dotenv.config()

export const authHeaders = {'Authorization' : `Bearer ${process.env.APIKEY}`, 'User-Key' : process.env.APIKEY}