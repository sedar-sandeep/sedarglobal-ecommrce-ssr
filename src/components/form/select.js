
import { Form, FormGroup, FormSelect } from 'react-bootstrap';
import React from 'react';

const SelectBox = (props) => {
  const { name, type, placeholder, value, min, error, required, label, maxLength, max, disabled, className, options } = props;

  return (
    <FormGroup>
      {label && <Form.Label>{label}</Form.Label>}
      <FormSelect
        name={name}
        disabled={disabled}
        type={type}
        className={className}
        maxLength={maxLength}
        max={max}
        min={min}
        placeholder={placeholder}
        value={value}
        required={required}
        validate={props.validate}
        onChange={(e) => props.onChange(e)}
        isInvalid={error}
      >
        {options && options.map((item, index) => {
          return (
            <option key={`${name}${index}`} value={item.value}>{item.label}</option>
          )
        })}

      </FormSelect>
      {error && (
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      )}
    </FormGroup>
  )
}

export default SelectBox;