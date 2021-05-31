import styled from "styled-components";
import Form from "./Form";

const Left: React.FC = () => {
  return (
    <StyledLeft>
      <div className="bgWhite"></div>
      <Form />
    </StyledLeft>
  );
};

const StyledLeft = styled.div`
  width: var(--leftWidth);
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  .bgWhite {
    position: absolute;
    top: -50%;
    left: 0;
    transform: translate(-50%);

    width: calc(2 * var(--leftWidth));
    height: 180%;
    border-radius: 50%;

    background: #fff;

    will-change: transform;
    animation: rotate 15s linear infinite;

    @keyframes rotate {
      0% {
        transform: translate(-50%) rotateY(0);
      }
      100% {
        transform: translate(-50%) rotateZ(180deg);
      }
    }
  }
`;

export default Left;
