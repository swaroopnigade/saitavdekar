import React from 'react'
import Form from 'react-bootstrap/Form';

const Input = (props) => {
  const {className, id, label, placeholder, type, onChange, name, value, formErrorData, key, disabled} = {...props}
  return (
    <Form.Group className={className} controlId={id} key={key}>
        <Form.Label>{label}</Form.Label>
        <Form.Control type={type} placeholder={placeholder} onChange={onChange} name={name} value={value} disabled={disabled} autoComplete='off'/>
        <div className='form-error text-danger'>{formErrorData && formErrorData[name]}</div>
    </Form.Group>
  )
}

export default Input