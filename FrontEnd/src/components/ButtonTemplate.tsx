import React from "react";
import "./ButtonTemplate.css"

interface ButtonProps{
    name: string;
    onclick?: ()=> void;
}

function ButtonTemplate(props: ButtonProps){
    return (
        <button onClick={props.onclick} className="button-87">{props.name}</button>
    )
}

export default ButtonTemplate;