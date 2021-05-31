import styled from "styled-components";

import Form from "./Form";

const Right = () => {
  return (
    <StyledRight>
      {/* <svg width="0" height="0" viewBox="0 0 1 1">
        <defs>
          <clipPath id="path" clipPathUnits="objectBoundingBox">
            <rect x="0" y="0" width="1" height="1" />
          </clipPath>

          <filter id="displacementFilter">
            <feTurbulence
              id="turbulence"
              baseFrequency={svgValues && svgValues.baseFrequency}
              numOctaves={svgValues && svgValues.numOctaves}
            />
            <feDisplacementMap
              id="displacement"
              scale={svgValues && svgValues.scale}
              in="SourceGraphic"
            />
          </filter>
        </defs>
      </svg> */}

      <div className="whiteBg">
        <div></div>
      </div>
      <Form />
    </StyledRight>
  );
};

const StyledRight = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 0;
    height: 0;
  }

  .whiteBg {
    position: absolute;
    top: 0;
    right: 0%;
    width: 40vw;
    height: 100vh;

    overflow: hidden;
    z-index: 1;

    div {
      width: 100%;
      height: 200%;
      background: #fff;
    }
  }
`;

export default Right;
