import React from "react";
import "./InputTemplate.css"
import AdbIcon from '@mui/icons-material/Adb';

interface InputProps{
    id: string;
    name?: string;
    placeholder: string;
    type: string;
    value?: string;  
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    class: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    iconFunction?: string;
    icon? : boolean
}

const icons = (iconFunction: any)=>{
  return (
    <div onClick={() => {iconFunction}} style={{marginTop: "5px"}}>
    <AdbIcon/>
  </div>
  )
}

const InputTemplate = (props: InputProps) => {
    return (
      <div>
        <p className="p">{props.name}</p>
        <div style={{display: "flex"}}>
        <input
          value={props.value}  
          onChange={props.onChange}  
          placeholder={props.placeholder}
          className={props.class}
          type={props.type}
          id={props.id}
          minLength={props.minLength}
          maxLength={props.maxLength}
          min={props.min}
          max={props.max}
          required
        />
        {props.icon ? icons(props.iconFunction) : ""}
        </div>      
      </div>
    );
  };
export default InputTemplate;