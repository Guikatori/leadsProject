import React from "react";
import "./ButtonTemplate.css";

interface ButtonProps {
  name: string;
  onclick?: () => void;
  formsSubmit?: boolean;
}

function ButtonTemplate(props: ButtonProps) {
  const buttonType = props.formsSubmit ? "submit" : "button"; 

  return (
    <button onClick={props.onclick} className="button" type={buttonType}>
      {props.name}
    </button>
  );
}

export default ButtonTemplate;
