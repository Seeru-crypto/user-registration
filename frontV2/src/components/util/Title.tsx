import React from "react";

interface TitleProps{
    value: string;
}

const Title = ({value}: TitleProps) : JSX.Element => {
    return (
        <h1 data-testid="title">{value}</h1>
    )
}

export default Title;