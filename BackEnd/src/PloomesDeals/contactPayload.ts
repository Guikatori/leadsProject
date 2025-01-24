interface ContactDb{

    Name: {S: string};
    Adress: {S: string};
    LeadId: {N: number};
    Phone: {S: string}

}

interface Phone{
    PhoneNumber: string
}

interface ContactPayload{

    Name: string;
    StreetAddress: string;
    TypeId: number;
    OwnerId: number;
    Phones: Phone[];
}



export const contactPayload = (contactDb: ContactDb, ownerId: number): ContactPayload => {
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