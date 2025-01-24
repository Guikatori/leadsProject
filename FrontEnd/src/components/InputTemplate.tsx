import React from "react";
import "./InputTemplate.css"

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
    max?: number

}

const InputTemplate = (props: InputProps) => {
    return (
      <div>
        <p className="p">{props.name}</p>
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
      </div>
    );
  };

export default InputTemplate;