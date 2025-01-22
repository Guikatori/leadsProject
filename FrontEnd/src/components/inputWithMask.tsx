import React,  { useRef }  from "react";
import "./InputTemplate.css"
import { InputMask } from '@react-input/mask';

interface InputProps{
    id?: string;
    name?: string;
    placeholder: string;
    mask: string;
    value?: string;  
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
 }

function MaskInput(props: InputProps){
        return (
        <div>
        <p className="p">{props.name}</p>
        <InputMask onChange={props.onChange} id={props.id} value={props.value} className="input" mask={props.mask} replacement={{ _: /\d/ }} placeholder={props.placeholder}/>
        </div>
    )
}

export default MaskInput;



