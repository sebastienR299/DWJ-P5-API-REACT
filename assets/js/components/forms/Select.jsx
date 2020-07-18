import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const Select = ({name, value, error, label, onChange, children}) => {
    return ( 

        <FormGroup>
            <Label for={name}>{label}</Label>
            <Input 
            type="select" 
            name={name} 
            id={name}
            onChange={onChange}
            value={value}
            bsSize="lg"
            className={error ? "is-invalid" : null}
            >

            {children}

            </Input>
            <p className="invalid-feedback">{error}</p>
        </FormGroup>

     );
}
 
export default Select;