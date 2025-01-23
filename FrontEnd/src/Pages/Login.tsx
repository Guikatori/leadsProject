import { Link } from "react-router-dom";
import sunhub from "../assets/sunhubbr_logo.jpg";
import "./Login.css";
import ButtonTemplate from "../components/ButtonTemplate";
import InputTemplate from "../components/InputTemplate";
import Warning from '../components/warningTemplate';

function LoginPage() {

  const loginConfirm = () =>{

  }

  return (
    <>
      <div>
        <img src={sunhub} className="logo" alt="Sunhub" />
      </div>
      <h1 className="Title">Lead Picker</h1>
      <div>
        <div className="inputLine">
          <InputTemplate id="Login" name="Login" placeholder="Insira Seu Email" type="email"    class="input"/>
          <InputTemplate id="Senha" name="Senha" placeholder="Insira Sua Senha" type="password" class="input"/>
        </div>
        <ButtonTemplate name="Login" />
      </div>
      <p className="greyText">
        Não possui uma conta? <Link to="/register" className="register">Registre-se</Link>
      </p>
    </>
  );
}

export default LoginPage;
