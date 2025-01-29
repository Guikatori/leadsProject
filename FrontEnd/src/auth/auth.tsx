import {useEffect } from "react";
import {useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedPage = ({children}: {children: React.ReactNode }) =>{

const navigate = useNavigate();

useEffect(()=>{
    const validateToken = async ()=>{
        
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('Login')

    if(!token || !email){
        navigate("/");
        return;
    }

    const validToken = await axios.post("http://localhost:3000/validateToken", {token}, {validateStatus: (status) => status < 500})
    console.log(validToken)
    if(validToken.status === 200){
        return
    }
    const refreshToken = await axios.post("http://localhost:3000/refresh", {token, email}, {validateStatus: (status) => status < 500});
    if(refreshToken.status === 200){
        const newtoken = refreshToken.data.newToken
        localStorage.setItem("token", newtoken)
        return
    }
    localStorage.removeItem('token');
    localStorage.removeItem('Login')
    return  navigate("/");
}
validateToken()
}, [navigate]) 

return <>{children}</>
}

export default ProtectedPage;