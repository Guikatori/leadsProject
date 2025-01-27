import createContact from "./createContact"
import createDeal from "./createDeal"

/*

export const createLead = async (Items) => {
    //por enquanto passarei assim
    console.log(Items) 
    const contactData =  await createContact(Items[0], ownerId)
    console.log(contactData)
    const contactId = contactData && contactData.value ? contactData.value[0].Id : null
    contactId ? console.log("Contato criado") : console.log("Erro ao Criar Contato")
    const dealId = await createDeal(Items[0], ownerId, contactId)
    console.log(dealId.value[0].Id)
   }
*/

export const createLeads = async (Items) => {
    const ownerId = 40079953
    const promises = Items.map(item => {
        const contactData = createContact(item, ownerId)
        return contactData ? contactData : null
    });
    const contacts = await Promise.all(promises)
    console.log(contacts)
}




