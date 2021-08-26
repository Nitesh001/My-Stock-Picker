import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

const PickerSearch: React.FC<{placeholder?: string, onFocus: any, onChange: any, onEnter: any, value?:string }> = ({placeholder, onFocus, onChange, onEnter, value}) => {

  const [currentVal, setCurrentVal] = useState(value || "");

  return (
    <InputGroup className="mb-3">
        <Form.Control type="text" placeholder={placeholder}
        onClick={(evt)=>evt.stopPropagation()}
        onFocus={(evt: any)=>{
          onFocus(evt, evt.target.value);
        }} onChange={(evt: any)=>{
          const targetVal = evt.target.value
          onChange(evt, targetVal);
          setCurrentVal(targetVal);
        }} value={currentVal} onKeyUp={(evt)=>{ evt.key === 'Enter' && onEnter(evt, currentVal);
        }} />
        <Button variant="primary" onClick={(evt)=>{onEnter(evt, currentVal)}}>
          Search
        </Button>
        <Button variant="secondary" onClick={(evt)=>{setCurrentVal("");onEnter(evt, "");}}>
          Reset
        </Button>
    </InputGroup>
  )
}

export default PickerSearch;