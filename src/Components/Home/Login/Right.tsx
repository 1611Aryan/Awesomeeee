import styled from "styled-components"

import Form from "./Form"

const Right = () => {
  return (
    <StyledRight>
      <div className="whiteBg"></div>
      <Form />
    </StyledRight>
  )
}

const StyledRight = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .whiteBg {
    position: absolute;
    top: 0;
    right: 0;
    width: 40vw;
    height: 100vh;

    overflow: hidden;
    z-index: 1;

    background: #fff;
  }

  @media only screen and (max-width: 600px) {
    width: 100%;
    .whiteBg {
      bottom: 0;
      left: 0;
      width: 100vh;
      height: 100vh;
      border-radius: 50%;
      transform: translate(-45%, 20%);
    }
  }
`

export default Right
