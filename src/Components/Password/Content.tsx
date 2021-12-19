import { TiArrowBackOutline } from "react-icons/ti"
import { Link } from "react-router-dom"
import styled from "@emotion/styled"
import ForgotForm from "./Forgot/Form"
import ChangeForm from "./Change/Form"

const Content: React.FC<{ heading: "forgot" | "change" }> = ({ heading }) => {
  return (
    <StyledContent>
      <div className="header">
        <Link to="/">
          <TiArrowBackOutline />
        </Link>
      </div>
      <h1>{heading === "forgot" ? "Forgot Password" : "Change Password"}</h1>
      {heading === "forgot" ? <ForgotForm /> : <ChangeForm />}
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
      font-size: clamp(1.5em, 3vw, 2em);
    }
  }
  h1 {
    width: 60%;
    margin: 0 auto;
    color: #464977;
    font-size: clamp(1.5em, 3vw, 2em);
  }

  @media only screen and (max-width: 500px) {
    width: calc(100% - var(--padding) * 2);

    h1 {
      margin-top: 1em;
      width: 80%;
    }
  }
`

export default Content
