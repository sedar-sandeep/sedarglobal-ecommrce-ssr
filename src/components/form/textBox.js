import { Form, FormGroup } from 'react-bootstrap';
import React from 'react';
const TextBox = (props) => {
  const { name, type, placeholder, value, min, error, required, label, maxLength, max, disabled, className } = props;

  return (
    <FormGroup className="mb-2 mt-2">
      <Form.Label className={className}> {label} </Form.Label>
      <Form.Control
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
      {error && (
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      )}
    </FormGroup>
  );
};

export default TextBox;