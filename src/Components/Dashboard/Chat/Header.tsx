import { useRef } from "react";
import styled from "styled-components";
import { HiDotsVertical } from "react-icons/hi";

const Header: React.FC<{
  selected: {
    name: string;
    img: string;
  } | null;
}> = ({ selected }) => {
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <StyledHeader>
      <div className="profileContainer">
        <div className="profileImage">
          <img
            ref={imageRef}
            onLoad={() =>
              imageRef.current
                ? (imageRef.current.style.clipPath = "circle(100% at center")
                : ""
            }
            src={selected ? selected.img : ""}
            alt="contact profile"
          />
        </div>
        <h1>{selected && selected.name}</h1>
      </div>
      <HiDotsVertical />
      <div className="border"></div>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  width: 100%;
  height: var(--HeaderHeight);
  padding: var(--HeaderPadding) 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;

  color: white;

  .border {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 99%;
    height: 1px;
    background: linear-gradient(to bottom, #fff, transparent);
  }

  .profileContainer {
    width: auto;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .profileImage {
      width: var(--ImageHeight);
      height: var(--ImageHeight);

      border-radius: 50%;

      align-self: center;
      background: rgb(44, 44, 44);
      overflow: hidden;
      img {
        //height: 100%;
        width: 100%;

        object-fit: cover;
        clip-path: circle(0);
        transition: all 0.2s;
      }
    }

    h1 {
      margin-left: 0.5em;

      font-family: var(--fontHeading);
      font-weight: 500;
      font-size: var(--headingSize);
    }
  }
  svg {
    font-size: 2em;
  }
`;

export default Header;
