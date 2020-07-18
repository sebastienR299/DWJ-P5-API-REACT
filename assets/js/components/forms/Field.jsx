import React from 'react';
import { Label, FormGroup, Input } from 'reactstrap';

// - name
// - label
// - id
// - value
// - onChange
// - placeholder
// - type
// - error

const Field = ({name, label, id, value, onChange, placeholder = "", type = "text", error = ""}) => ( 

        <FormGroup>
            <Label for={id}>{label}</Label>
                <Input
                value={value}
                onChange={onChange}
                id={id}
                placeholder={placeholder || label}
                type={type}
                name={name}
                bsSize="lg"
                className={error ? "is-invalid" : null}
                />
                {error ? <p className="invalid-feedback">
                    {error}
                </p>
                : null}
        </FormGroup>
 );

export default Field;