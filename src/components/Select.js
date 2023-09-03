import React from 'react';
import Form from 'react-bootstrap/Form';

const Select = (props) => {
    const {className, id, label, onChange, name, value, formErrorData, documemtList, disabled} = {...props}
    return (
        <Form.Group className={className} >
            <Form.Label>{label}</Form.Label>
            <Form.Select 
                controlId={id} 
                aria-label="Default select example"
                name={name} 
                onChange={onChange}
                value={value}
                disabled={disabled}
            >
                <option value="0">Select</option>
                {
                    documemtList.map((item, index) => {
                        return(
                            <option key={item.value+index} value={item.value}>{item.label}</option>
                        )
                    })
                }
            </Form.Select>
            <div className='form-error text-danger'>{formErrorData && formErrorData[name]}</div>
        </Form.Group>
    )
}

export default Select