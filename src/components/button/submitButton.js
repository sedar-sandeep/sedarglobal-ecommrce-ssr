import { Button } from 'react-bootstrap';
import React from 'react';
import { LoaderBox } from '@components/loader/index';

const SubmitButton = (props) => {
  const { isLoading, label, type, disabled, variant, onClick, className } = props;

  return (
    <>
      <Button
        type={type}
        className={className}
        disabled={disabled}
        variant={variant}
        onClick={onClick}
      > {label} {isLoading &&
        <LoaderBox
          animation="border"
          variant="light"
          size="sm" />
        }
      </Button>
    </>
  );
};
export default SubmitButton;
