
export const handleStatus = (statusCode: number, text: string)=>{

    if(statusCode === 200){
        console.log("Requisição Feita com sucesso")
        return true
    }
    if(statusCode === 429){
        console.log("TimeOut Na Requisição", text)
        return false
    }
    if(statusCode === 500){
        console.log("TimeOut Na Requisição", text)
        return false
    }
    if(statusCode === 401){
        console.log("Não autorizado", text)
        return false
    }
}
