import styled from "styled-components";
import { IoSend } from "react-icons/io5";

const Input: React.FC = () => {
  return (
    <StyledInput>
      <div className="borderT"></div>
      <form>
        <input type="text" />
        <button>
          <div className="borderL"></div>
          <IoSend />
        </button>
      </form>
    </StyledInput>
  );
};

const StyledInput = styled.div`
  width: 100%;
  position: relative;
  height: var(--InputHeight);

  .borderT {
    position: absolute;
    top: 0;
    left: 50%;

    transform: translateX(-50%);
    height: 1px;
    width: 99%;
    background: linear-gradient(to top, #fff, transparent);
  }
  form {
    padding: 1rem 1.5rem;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    font-size: 1rem;

    input {
      width: 100%;

      background: rgb(16, 16, 16, 0.5);
      border-radius: 5px 0 0 5px;
      padding: 0.5em 0.5em;
      font-size: 1em;
      font-family: var(--fontContent);
      color: #bdbdbd;
    }
    button {
      background: rgb(16, 16, 16, 0.5);
      border-radius: 0 5px 5px 0;
      color: #bdbdbd;
      padding: 0.5em 0.5em;
      font-size: 1.5em;

      display: grid;
      place-items: center;
      position: relative;

      .borderL {
        position: absolute;
        top: 50%;
        left: 0px;

        transform: translateY(-50%);
        height: 70%;
        width: 1px;
        background: linear-gradient(to right, #fff, transparent);
      }
    }
  }
`;

export default Input;
