import React from "react";
import styled from "styled-components";
import {UseFormRegister} from "react-hook-form";

interface FormInputProps {
    placeholder?: string;
    options?: {},
    name: any
    register: UseFormRegister<any>;
}

const FormInput = ({register, name, options, placeholder, ...rest}: FormInputProps): JSX.Element => {
    return <FormInputStyle data-testid={name} placeholder={placeholder} {...register(name, options)} {...rest} />;
}

export default FormInput;

const FormInputStyle = styled.input`
  font-size: var(--size300);
  border-radius: var(--size100);
  padding: var(--size100);
  border: none;
  border-bottom: 2px solid var(--teal400);
    
  :focus{
    outline: none;
  }

`