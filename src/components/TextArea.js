import React from 'react';
import Form from 'react-bootstrap/Form';

const TextArea = (props) => {
    const {className, id, label, placeholder, onChange, name, value, formErrorData, disabled} = {...props}
    return (
        <Form.Group className={className} controlId={id}>
            <Form.Label>{label}</Form.Label>
            <Form.Control as="textarea" placeholder={placeholder} name={name} onChange={onChange} value={value} disabled={disabled}/>
            <div className='form-error text-danger'>{formErrorData && formErrorData[name]}</div>
        </Form.Group>
    )
}

export default TextArea