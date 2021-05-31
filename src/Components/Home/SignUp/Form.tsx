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
        <label htmlFor="email">Email</label>
        <input
          type="text"
          // required
          autoFocus
          name="email"
        />
      </div>
      <div className="inputContainer">
        <label htmlFor="password">Password</label>
        <input
          type="text"
          //required
          name="password"
        />
      </div>
      <button>Sign Up</button>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  width: 100%;
  padding: 0 var(--padding);

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  font-family: var(--fontContent);

  z-index: 5;
  .inputContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin: 1em 0;
  }

  label {
    font-size: 1.75em;
  }

  input {
    width: 60%;
    background: #ececec;
    border-radius: 5px;

    padding: 0.4em 0.5em;
    font-size: 1.25em;
  }

  button {
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
