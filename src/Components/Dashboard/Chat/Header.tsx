import { useRef } from "react"
import styled from "styled-components"
import { HiDotsVertical } from "react-icons/hi"
import { useSelectedContact } from "Providers/SelectedContactProvider"
import { useSelector } from "react-redux"
import { rootState } from "Reducers"

const Header: React.FC<{}> = () => {
  const { selected } = useSelectedContact()
  const { contacts } = useSelector((state: rootState) => state)

  const imageRef = useRef<HTMLImageElement>(null)

  const loadImage = () =>
    imageRef.current ? imageRef.current.classList.add("visible") : ""

  const selectedContact =
    selected && contacts
      ? contacts.filter(contact => contact.contactId === selected.contactId)[0]
      : null

  return (
    <StyledHeader>
      <div className="profileContainer">
        <div className="profileImage">
          <img
            ref={imageRef}
            onLoad={loadImage}
            src={selectedContact?.profilePicture.thumbnail}
            alt="contact profile"
          />
        </div>
        <div className="info">
          <h1>{selectedContact?.name}</h1>
          {selectedContact?.online && (
            <div className="online">
              <div className="dot"></div> <span>Online</span>
            </div>
          )}
        </div>
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

      .visible {
        opacity: 1;
      }
      img {
        height: 100%;
        width: 100%;

        border-radius: 50%;

        object-fit: cover;

        opacity: 0;
        transition: all 200ms;
      }
    }

    .info {
      margin-left: 0.5em;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      font-size: var(--HeaderFontSize);
      font-family: var(--fontHeading);

      h1 {
        font-size: 1em;
        font-weight: 500;
      }
      .online {
        display: flex;

        justify-content: flex-start;
        align-items: center;
        .dot {
          margin-right: 0.2em;

          display: inline;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgb(255, 167, 81);
          animation: hue 10s infinite alternate;
        }
        span {
          text-transform: uppercase;
          font-size: 0.4em;
          color: rgb(255, 167, 81);
          font-weight: 300;
          line-height: 1;
          letter-spacing: 1px;
          animation: hue 10s infinite alternate;
        }
      }

      @keyframes hue {
        to {
          filter: hue-rotate(360deg);
        }
      }
    }
  }
  svg {
    font-size: var(--HeaderFontSize);
  }
`

export default Header
