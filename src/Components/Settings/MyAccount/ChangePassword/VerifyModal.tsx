import { verifyPassword } from "API_Endpoints"
import axios from "axios"
import { useState } from "react"
import styled from "@emotion/styled"

const VerifyModal: React.FC<{
  setPasswordModalVis: React.Dispatch<React.SetStateAction<boolean>>
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setPasswordModalVis, setSuccess }) => {
  const [input, setInput] = useState("")

  const closeModal = () => {
    setPasswordModalVis(false)
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (input) {
        const res = await axios[verifyPassword.METHOD]<{ success: boolean }>(
          verifyPassword.URL,
          { oldPassword: input },
          { withCredentials: true }
        )
        console.log(res.data)
        setSuccess(res.data.success)
      }
    } catch (err: any) {
      setSuccess(false)
      console.log(err.response ? err.response : err)
    }
  }

  return (
    <StyledForm onSubmit={submitHandler}>
      <h1>Verify Password</h1>
      <div className="fieldContainer">
        <label htmlFor="oldPassword">Enter Your Current Password</label>
        <input
          type="password"
          name="oldPassword"
          autoFocus
          required
          onChange={changeHandler}
        />
        <span>Forgot Password?</span>
      </div>
      <div className="buttonContainer">
        <button>Verify</button>
        <button type="button" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </StyledForm>
  )
}

const StyledForm = styled.form`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;

  overflow: hidden;

  h1 {
    color: #fff;
    font-family: var(--fontHeading);
    font-size: 2.5em;
    line-height: 1;
  }

  & > * + * {
    margin: 0.75em 0;
  }

  .error {
    line-height: 1;
    height: 0.7em;
    font-size: 0.7em;
    font-weight: 300;
    color: #eb7960;
  }

  .fieldContainer {
    width: 100%;

    display: flex;
    flex-direction: column;

    label {
      font-size: 1.2em;
      font-weight: 400;
      color: white;
      letter-spacing: 1px;
    }
    input {
      display: block;
      width: 100%;
      margin: 1em 0 0;

      padding: 0.5em 0.4em;
      font-size: 1em;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.9);
    }
    span {
      align-self: flex-end;

      margin: 0.5em 0;
      padding: 0.3em 0;

      font-size: clamp(0.7em, 3vw, 0.9em);
      color: #d5c54d;
      transition: color ease-out 100ms;

      cursor: pointer;
      &:hover {
        color: #e27481;
      }
    }
  }
  .buttonContainer {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    gap: 1em;
    button {
      padding: 0.8em 1.75em;
      border-radius: 5px;
      font-size: 1em;
      color: #fff;

      &:nth-of-type(1) {
        background: linear-gradient(
          90deg,
          rgba(101, 117, 255, 0.923958) 0.01%,
          #4c5eff 99.97%
        );
        box-shadow: inset -2px -2px 4px rgba(0, 0, 0, 0.25),
          inset 2px 2px 4px rgba(0, 0, 0, 0.25);
      }
      &:nth-of-type(2) {
        background: linear-gradient(90deg, #a065ff 0.01%, #f14cff 99.97%);
        box-shadow: inset -2px -2px 4px rgba(0, 0, 0, 0.25),
          inset 2px 2px 4px rgba(0, 0, 0, 0.25);
      }
    }
  }
`

export default VerifyModal
