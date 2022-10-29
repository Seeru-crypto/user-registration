import React from "react";
import styled from "styled-components";

interface FormErrorMessageProps {
    value: string | undefined;
}

const FormErrorMessage = ({value}: FormErrorMessageProps): JSX.Element => {
    return (
        <FormButtonStyle>{value}</FormButtonStyle>
    )
}

export default FormErrorMessage;
const FormButtonStyle = styled.small`
color: var(--red300);
  min-height: var(--size300);
`