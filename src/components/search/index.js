import { Form, InputGroup, FormGroup } from 'react-bootstrap'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/index';


export const SearchBox = (props) => {
    const { name, type, placeholder, value, min, error, required, label, maxLength, max, disabled, className } = props;
    return (
        <FormGroup>
            <InputGroup className="border-0">
                <InputGroup.Text className='border-0 border-bottom bg-white' id="basic-addon1">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </InputGroup.Text>
                <Form.Control
                    className='border-0 border-bottom shadow-none'
                    name={name}
                    disabled={disabled}
                    type={type}
                    maxLength={maxLength}
                    max={max}
                    min={min}
                    placeholder={placeholder}
                    value={value}
                    required={required}
                    validate={props.validate}
                    onChange={(e) => props.onChange(e)}
                    isInvalid={error}
                />
            </InputGroup>
            {error && (
                <Form.Control.Feedback type="invalid">
                    {error}
                </Form.Control.Feedback>
            )}
        </FormGroup>
    )
}

export default SearchBox