import React from "react";

export const apiKey = "DECAE22B7A3A342EF63CA6FEF4E4C762930D9F84DEFF29760C5B0F3D16120E9249DCD20D9B6FB9E57D7D25BA8C2A51A403272B563ED83623D0D2B0AA4237141F"
export const baseUrl = 'https://api2.ploomes.com'
export const userUrl = `${baseUrl}/Users`
export const authHeaders = {'Authorization' : `Bearer ${apiKey}`, 'User-Key' : apiKey}
