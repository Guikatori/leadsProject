import React, { ElementType, JSXElementConstructor } from "react";
import "./InputTemplate.css"
import AdbIcon from '@mui/icons-material/Adb';
import AcUnitIcon from '@mui/icons-material/AcUnit';

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
    style?:  React.CSSProperties;
    iconFunction?: ()=> void;
    icon? : boolean,
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
          style={props.style}
          />
        </div>      
      </div>
    );
  };



/*
{props.icon && (
          <div onClick={props.iconFunction}
          style={{position: "absolute", marginLeft: "340px", display: "flex", cursor:"pointer",marginTop: "5px"}}>
            <AdbIcon/> 
          </div>
        )}
*/

export default InputTemplate;