import styled from "styled-components";

export const CTAStyle = styled.a`
  font-size: var(--size400);
  text-decoration: none;
  color: var(--gray100);
  background-color: var(--teal500);
  padding: var(--size200);
  border-radius: var(--size200);
  transition: all 350ms linear;
  
  :hover{
    background-color: var(--gray200);
    color: var(--teal500);
  }
`