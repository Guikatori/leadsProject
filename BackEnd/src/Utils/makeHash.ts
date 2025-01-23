import * as crypto from 'crypto';

const makeHash = (email: String, password: String) =>{
    const el = `${email}${password}`;
    return crypto.createHash('sha256').update(Buffer.from(el)).digest('hex');
}

export default makeHash;