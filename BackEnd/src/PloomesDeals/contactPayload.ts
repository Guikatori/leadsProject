export const contactPayload = (Data: {Name: string, Address: string, TypeId: number, Phone: string}) => {

    return {
        "Name": Data.Name,
        "StreetAddress": Data.Address,
        "TypeId": Data.TypeId,
        "Phones": [
            {
                "PhoneNumber": Data.Phone
            }
        ]
    }
}