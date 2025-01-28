import jwt from 'jsonwebtoken'

const ACCESS_SECRET = 'access-secret-key';
const REFRESH_SECRET = 'refresh-secret-key';

interface TokenPayload {
    sub: string,
    userType?: string
}

export const generatorToken = (email: string, userType: string): string => {
    const payload: TokenPayload = { sub: email, userType };
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: '15m' })
}

export const generateRefreshToken = (email: string): string => {
    const payload: TokenPayload = { sub: email };
    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' })
}

//se não tiver erro, retorna true - quer dizer que foi validado de acordo com a documentação
export const verifyToken = (token: string, tokenType: string): boolean => {
    let isValid = false
    jwt.verify(token, tokenType, (err) => {
        err ? isValid : isValid = true;
    })
    return isValid;
}