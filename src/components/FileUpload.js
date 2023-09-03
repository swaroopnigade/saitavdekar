import React from 'react';
import Form from 'react-bootstrap/Form';

const FileUpload = (props) => {
    const {className, id, label, onChange, name, value, formErrorData} = {...props}
    return (
        <Form.Group controlId="formFile" className={className}>
            <Form.Label>{label}</Form.Label>
            <Form.Control 
                type="file" 
                id={id} 
                onChange={onChange}
                name={name}
                value={value}
                multiple
            />
            <div className='form-error text-danger'>{formErrorData && formErrorData[name]}</div>
        </Form.Group>
    )
}

export default FileUpload