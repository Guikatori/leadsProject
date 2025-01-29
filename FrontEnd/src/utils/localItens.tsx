export const localItens = (Key: string,  ploomesId: string, email: string): void=>{
    localStorage.setItem('Key', Key);
    localStorage.setItem('ploomesId', ploomesId)
    localStorage.setItem('Login', email)
    return;
  }