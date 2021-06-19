import { useRef } from "react"
import styled from "styled-components"
import { HiDotsVertical } from "react-icons/hi"
import { useSelectedContact } from "../../../Providers/SelectedContactProvider"

const Header: React.FC<{}> = () => {
  const { selected } = useSelectedContact()

  const imageRef = useRef<HTMLImageElement>(null)

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
            decoding="async"
            src={selected ? selected.profilePicture.thumbnail : ""}
            alt="contact profile"
          />
        </div>
        <h1>{selected && selected.name}</h1>
      </div>
      <HiDotsVertical />
      <div className="border"></div>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  width: 100%;
  height: var(--headerHeight);
  padding: var(--HeaderPadding) 1.5em;

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
    width: 100%;
    height: 1px;
    background: linear-gradient(to bottom, #dadada88, transparent);
  }

  .profileContainer {
    width: auto;
    height: var(--headerHeight);
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .profileImage {
      width: calc(var(--headerHeight) * 0.8);
      max-width: 20vw;
      height: calc(var(--headerHeight) * 0.8);

      border-radius: 50%;

      align-self: center;
      background: rgb(44, 44, 44);
      overflow: hidden;
      img {
        height: 100%;
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
      font-size: var(--HeaderFontSize);
    }
  }
  svg {
    font-size: var(--HeaderFontSize);
  }
`

export default Header
