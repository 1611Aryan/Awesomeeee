import styled from "styled-components";

const Right: React.FC = () => {
  return (
    <StyledRight>
      <p>
        <span className="span1">Let's Get</span>
        <br />
        <span className="span2">
          <span className="bounce">S</span>
          tarted
        </span>
      </p>
    </StyledRight>
  );
};

const StyledRight = styled.div`
  width: var(--rightWidth);
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  p {
    padding: 0 var(--padding);
    width: 100%;
    font-family: var(--fontHeading);
    color: white;

    line-height: 1.1;
    text-align: right;
    .span1 {
      font-size: 6em;
    }
    .bounce {
      display: inline-block;

      animation: bounce 0.75s ease-out infinite;

      @keyframes bounce {
        0% {
          transform: translateY(0) rotate(0deg);
        }
        25% {
          transform: rotate(-2deg);
        }
        50% {
          transform: translateY(-15px);
          animation-timing-function: ease-in;
        }
        75% {
          transform: rotate(2deg);
        }
        95% {
          transform: translateY(1px) rotate(0deg);
        }
        100% {
          transform: translateY(0) rotate(0deg);
        }
      }
    }
    .span2 {
      font-size: 7.5em;
      font-weight: 500;
    }
  }
`;

export default Right;
