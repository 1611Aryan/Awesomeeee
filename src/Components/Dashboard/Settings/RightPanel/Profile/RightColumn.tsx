import styled from "styled-components"

const RightColumn: React.FC = () => {
  return (
    <StyledRightColumn className="column">
      <form>
        <div className="fieldContainer">
          <label htmlFor="username">Username:</label>
          <br />
          <input type="text" name="username" />
        </div>
        <div className="fieldContainer">
          <label htmlFor="status">Status:</label>
          <br />
          <textarea name="status"></textarea>
        </div>
        <div className="fieldContainer">
          <button>Save</button>
        </div>
      </form>
    </StyledRightColumn>
  )
}

const StyledRightColumn = styled.div`
  form {
    align-items: center !important;
  }
  .fieldContainer {
    width: 80%;

    label {
      font-weight: 400;
      font-size: 1.5em;
      color: rgba(255, 255, 255, 0.8);
    }
    input,
    textarea {
      width: 100%;
      margin: 1.5em 0;

      border: 0;
      border-bottom: 1px solid #000;
      border-radius: 3px;
      padding: 0.5em;

      background: rgba(255, 255, 255, 0.7);

      font-size: 1.15em;
      color: #484848;

      &:focus {
        outline: 0;
      }
    }
    textarea {
      height: 25vh;
      resize: none;

      font-family: var(--fontContent);
    }
  }
  button {
    border: 0;
    border-radius: 10px;
    padding: 0.75em 2em;

    font-size: 1.25em;
    color: white;

    &:focus {
      outline: 0;
    }

    background: linear-gradient(
      to right,
      rgba(16, 16, 16, 0.5),
      rgba(36, 4, 56, 0.5)
    );
  }
`

export default RightColumn
