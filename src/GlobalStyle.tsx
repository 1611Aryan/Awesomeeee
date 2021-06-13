import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`

*,*::before,*::after{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

:root{
    --fontHeading:'Oswald', sans-serif;
    --fontContent:'Lato', sans-serif;
    --extrLarge:25vw;
    --large: 23vw;
    --medium: 21vw;
    --small: 19vw;
    --extrasmall: 17vw;
}


html[theme='small']{
--size:var(--small);
}

html[theme='medium']{
--size:var(--medium);
}
html[theme='large']{
--size:var(--large);
}

body{
    width:100vw;
    height:100vh;
    overflow-x: hidden;

     background: linear-gradient(to top, #2b5876, #4e4376);

    user-select: none;
}

button{
    border:0;
    cursor:pointer;
    &:focus{
        outline:0
    }
}

input{
    border:0;
    &:focus{
        outline:0
    }
}

a{
    color:inherit;
    text-decoration: none;;
}
`

export default GlobalStyle
