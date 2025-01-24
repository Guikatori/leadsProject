interface DealDb{

    Name: {S: string};
    Adress: {S: string};
    LeadId: {N: number};
    Phone: {S: string};
}

interface DealPayload{
    Title: string;
    ContactId: number;
    StageId: number;
    OwnerId: number;
    amount: number
}

export const dealPayload = (dealDb: DealDb, ownerId: number, contactId: number): DealPayload=>{
return{
    "Title": dealDb.Name.S,
    "ContactId": contactId,
    "StageId": dealDb.LeadId.N,
    "OwnerId": ownerId,
    "amount": 0,
}}