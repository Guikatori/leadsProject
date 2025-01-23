import React, { useState } from "react";
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import "./InputTemplate.css";

interface SelectTemplateProps {
  options: Array<string>; 
  value?: string; 
  onChange?: (value: string) => void; 
}

const SelectTemplate = (props: SelectTemplateProps) => {
  const [internalValue, setInternalValue] = useState(props.value || ""); 

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value;
    setInternalValue(newValue);
    if (props.onChange) props.onChange(newValue); 
  };

  return (
    <FormControl style={{ width: "120px", height: "20px" }}>
      <InputLabel>Estado</InputLabel>
      <Select
        value={internalValue} 
        onChange={handleChange} 
      >
        {props.options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectTemplate;
