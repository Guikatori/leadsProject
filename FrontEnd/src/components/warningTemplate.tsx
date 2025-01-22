import React from "react";
import "./warningTemplate.css";


interface warningTemplate{
    keyWord: string,
    message: string,
    color: string,
}

const warningTemplate = (props: warningTemplate) =>{
    return (
        <>
        <div className="alert" style={{backgroundColor: props.color}}>
        <span className="closebtn">&times;</span> 
        <strong>{props.keyWord}</strong> {props.message}
        </div>
        </>
    )
}

export default warningTemplate;