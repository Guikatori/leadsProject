export const localItens = (token: string, refreshToken: string,  ploomesId: string, email: string): void=>{
    console.log(token)
    console.log(refreshToken)
    console.log(ploomesId)
    console.log(email)


    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('ploomesId', ploomesId)
    localStorage.setItem('Login', email)
    return;
  }