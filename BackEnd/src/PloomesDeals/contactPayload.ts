interface Phone {

    PhoneNumber: string
}


export interface Contact {

    Name: string,
    StreetAddress: string,
    TypeId: number,
    Phones: Array<Phone>
}


export const contactPayload = (Name: string, Address: string, TypeId: number, Phone: string) => {

    return {
        "Name": Name,
        "StreetAddress": Address,
        "TypeId": TypeId,
        "Phones": [
            {
                "PhoneNumber": Phone
            }
        ]
    }
}