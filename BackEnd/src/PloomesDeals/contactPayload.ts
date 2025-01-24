export const contactPayload = (contactDb: { Name: { S: string }, Adress: { S: string }, LeadId: { N: number }, Phone: { S: string } }, ownerId: number) => {
    return {
        "Name": contactDb.Name.S,
        "StreetAddress": contactDb.Adress.S,
        "TypeId": contactDb.LeadId.N,
        "OwnerId": ownerId,
        "Phones": [
            {
                "PhoneNumber": contactDb.Phone.S
            }
        ]
    }
}