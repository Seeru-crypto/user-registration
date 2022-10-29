import React from "react";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import styled from "styled-components";

const Loader = (): JSX.Element => {
    return (
        <LoaderStyle>
            <AiOutlineLoading3Quarters className="loaderIcon"/>
        </LoaderStyle>
    )
}

export default Loader;

const LoaderStyle = styled.div`
  .loaderIcon{
    animation: spin 1s infinite linear;
    color: var(--teal400);
    font-size: var(--size400);

    @keyframes spin {
      from {
        transform: scale(1) rotate(0deg);
      }
      to {
        transform: scale(1) rotate(360deg);
      }

    }
`