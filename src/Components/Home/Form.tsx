import styled from "styled-components";

const Form: React.FC = () => {
  return (
    <StyledForm>
      <div className="inputContainer">
        <label htmlFor="username/email">Username/Email</label>
        <input
          type="text"
          name="username/email"
          autoFocus
          required
          placeholder="Enter Here"
        />
      </div>
      <div className="inputContainer">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          required
          placeholder="********"
        />
      </div>
      <div className="inputContainer">
        <button>Login</button>
      </div>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  position: relative;
  width: 100%;
  padding: 0 var(--padding);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  font-family: var(--fontContent);
  font-size: 1rem;
  color: var(--primary);

  z-index: 2;
  .inputContainer {
    width: 95%;

    label {
      font-size: 1.5em;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }

    input {
      width: 100%;
      padding: 0.5em 0.25em;

      font-size: 1.25em;
      color: #3d3c41;

      border-radius: 5px;
      border-bottom: 3px solid var(--primary);

      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
      margin: 1em 0 1.5em 0;
    }
    &:last-of-type {
      display: grid;
      place-items: center;
    }
  }
  button {
    padding: 0.35em 1.75em;

    background: var(--primary);
    color: #fff;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);

    font-weight: 900;
    font-size: 1.5em;

    border-radius: 5px;
  }
`;

export default Form;
