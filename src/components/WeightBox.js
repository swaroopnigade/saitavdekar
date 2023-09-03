import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const WeightBox = (props) => {
    const {className, id, label, placeholder, type, onChange, name, value, formErrorData, key, disabled, unitValue} = {...props}
  return (
    <InputGroup className={className} controlId={id} key={key}>
        <Form.Label className='w-100'>{label}</Form.Label>
        <Form.Control className='rounded' style={{'width':'60%'}} type={type} placeholder={placeholder} onChange={onChange} name={name} value={value} disabled={disabled} autoComplete='off'/>
        <Form.Select 
                className='rounded'
                controlId="weightUnit"
                aria-label="Default select example"
                name="weightUnit"
                onChange={onChange}
                value={unitValue}
                disabled={disabled}
            >
                <option value="0">Select</option>
                <option value="GM">GM</option>
                <option value="KG">KG</option>
            </Form.Select>
        <div className='form-error text-danger'>{formErrorData && formErrorData[name] || formErrorData["weightUnit"]}</div>
      </InputGroup>
  )
}

export default WeightBox