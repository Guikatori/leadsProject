export const dealPayload = (dealDb: { Name: { S: string }, Adress: { S: string }, LeadId: { N: number }, Phone: { S: string } }, ownerId: number, contactId: number)=>{

return{
    "Title": dealDb.Name.S,
    "ContactId": contactId,
    "StageId": dealDb.LeadId.N,
    "OwnerId": ownerId,
    "amount": 0,
}}