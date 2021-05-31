import React from "react";
import styled from "styled-components";
import { useAccess } from "../../../Providers/AccessProvider";

const Form: React.FC = () => {
  const { setAccess } = useAccess();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setAccess(true);
  };

  return (
    <StyledForm onSubmit={submitHandler}>
      <div className="inputContainer">
        <label htmlFor="username/email">Username/Email</label>
        <input
          type="text"
          name="username/email"
          autoFocus
          //required
          placeholder="Enter Here"
        />
      </div>
      <div className="inputContainer">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          //required
          placeholder="********"
        />
      </div>

      <button>Login</button>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  position: relative;
  width: 100%;
  padding: 0 var(--padding) 0 calc(var(--padding) * 1.5);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  font-family: var(--fontContent);
  font-size: 1rem;
  color: #000;

  z-index: 2;
  .inputContainer {
    width: 100%;

    label {
      font-size: 1.75em;
    }

    input {
      width: 100%;
      background: #ececec;
      border-radius: 5px;

      padding: 0.4em 0.5em;
      font-size: 1.25em;
      margin: 1em 0 1.5em 0;
    }
  }

  button {
    align-self: flex-start;
    background: #4d4476;
    color: #fff;
    border-radius: 5px;

    padding: 0.5em 1em;
    font-size: 1.25em;
    font-family: var(--fontHeading);
    letter-spacing: 1px;
    font-weight: 500;
  }
`;

export default Form;
