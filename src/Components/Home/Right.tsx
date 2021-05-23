import styled from "styled-components";

import Form from "./Form";

const Right = () => {
  return (
    <StyledRight>
      <svg width="0" height="10" viewBox="0 0 1 1">
        <defs>
          <clipPath id="path" clipPathUnits="objectBoundingBox">
            <rect x="0" y="0" width="1" height="1" />
          </clipPath>

          <filter id="displacementFilter">
            <feTurbulence
              id="turbulence"
              //baseFrequency="0"
              numOctaves="1"
              //type="fractalNoise"
            />
            <feDisplacementMap id="displacement" in="SourceGraphic" />
          </filter>
        </defs>
        <animate
          xlinkHref="#turbulence"
          attributeName="baseFrequency"
          dur="15s"
          from="0"
          to="0.02"
          values="0;0.02;0"
          repeatCount="indefinite"
        />
        <animate
          xlinkHref="#displacement"
          attributeName="scale"
          dur="30s"
          from="50"
          to="90"
          values="50;90;50"
          repeatCount="indefinite"
        />
      </svg>

      <div className="whiteBg"></div>
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
    top: -10%;
    right: -10%;
    width: 50%;
    height: 110%;
    background: #fff;
    clip-path: url(#path);
    filter: url("#displacementFilter");
    z-index: 1;
  }
`;

export default Right;
