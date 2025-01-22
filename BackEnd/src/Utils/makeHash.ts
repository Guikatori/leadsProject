import * as crypto from 'crypto';

const makeHash = (el: String) =>{

    return crypto.createHash('sha256').update(Buffer.from(el)).digest('hex');

}

export default makeHash;