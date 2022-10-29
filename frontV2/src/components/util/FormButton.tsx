import React from "react";
import styled, {css} from "styled-components";

interface FormButtonProps {
    type: "button" | "submit" | "reset" | undefined;
    onClick?: () => void;
    value: string;
    testId : string;
}

const FormButton = ({type, onClick, value, testId}: FormButtonProps): JSX.Element => {
    return (
        <FormButtonStyle value={value} className={`${(value === "next" || value === "confirm") ? "primary" : ""}`}
                         data-testid={testId} onClick={onClick} type={type}>{value}</FormButtonStyle>
    )
}

export default FormButton;

const FormButtonStyle = styled.button<{
    value: string
}>`
padding: 8px 16px;
  background-color: var(--gray300);
  border: none;
  border-radius: 8px;
  //color: var(--gray800);
  
  ${(props) => (props.value === "next" || props.value === "confirm" ) && PrimaryBtnStyle };
    }
  
  :hover{
    background-color: var(--gray500);
    color: var(--gray200);
    cursor: pointer;
  }
`

const PrimaryBtnStyle = css`
  color: var(--gray800);
  background-color: var(--teal400);

  :hover{
    background-color: var(--teal600);
    color: var(--gray100);
    cursor: pointer;
  }

`
