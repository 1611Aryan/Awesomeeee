import { useState } from "react"
import { TiArrowBackOutline } from "react-icons/ti"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Step1 from "./Step1"
import Step2 from "./Step2"
import Step3 from "./Step3"

const Content: React.FC = () => {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")

  return (
    <StyledContent>
      <div className="header">
        <Link to="/">
          <TiArrowBackOutline />
        </Link>
      </div>
      <h1>Forgot Password</h1>
      {step === 1 && <Step1 setStep={setStep} setEmail={setEmail} />}
      {step === 2 && <Step2 setStep={setStep} email={email} />}
      {step === 3 && <Step3 email={email} />}
    </StyledContent>
  )
}

const StyledContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 10px;
  width: 35vw;
  height: 50vh;

  display: grid;
  grid-template-rows: 10% 10% 80%;
  padding: 1.5rem 1rem;

  font-family: var(--fontContent);

  .header {
    color: #464977;
    display: grid;
    grid-template-columns: 33.3% 33.3% 33.3%;
    svg {
      cursor: pointer;
      font-size: 2em;
    }
  }
  h1 {
    width: 60%;
    margin: 0 auto;
    color: #464977;
    font-size: 2em;
  }
  .main {
    width: 60%;

    align-self: center;
    margin: 0 auto;
    form {
      width: 100%;

      display: flex;
      flex-direction: column;

      justify-content: flex-start;
      align-items: start;

      > * {
        margin-top: 0.75em;
      }

      p {
        font-size: 0.9em;
        opacity: 0.8;
      }

      .err {
        line-height: 1;
        height: 0.75em;
        color: red;
        font-size: 0.75em;
      }

      .success {
        line-height: 1;
        height: 0.75em;
        color: darkgreen;
        font-size: 0.75em;
      }

      label {
        font-size: 1.1em;
      }
      input {
        width: 100%;
        font-size: 1em;
        padding: 0.3em;
        opacity: 0.9;
        border-radius: 5px;
        border: 1px solid #464977;
      }
      button {
        background: #4d4476;
        color: #fff;
        border-radius: 5px;

        padding: clamp(0.3em, 2vw, 0.6em) 1.5em;
        font-size: clamp(0.7em, 2vw, 0.9em);

        font-weight: 500;
      }
    }
  }
`

export default Content
