import * as crypto from 'crypto';

const makeHash = (email: String, password: String) =>{
    if(!email || !password){
        console.log("Hash Error")
        return null
    }
    const el = `${email}${password}`;
    return crypto.createHash('sha256').update(Buffer.from(el)).digest('hex');
}

export default makeHash;