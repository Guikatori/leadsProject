export const handleStatus = (statusCode: number, text: string)=>{
    console.log(`Status: ${statusCode} Body: ${text}`)
    return statusCode >= 200 && statusCode <= 299;
}