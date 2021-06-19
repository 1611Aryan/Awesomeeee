import { useRef } from "react"
import styled from "styled-components"
import { useSelectedContact } from "../../../Providers/SelectedContactProvider"
import { contactI } from "../../../Providers/UserProvider"

const Contact: React.FC<{
  contact: contactI
}> = ({ contact }) => {
  const imageRef = useRef<HTMLImageElement>(null)

  const { selected, setSelected } = useSelectedContact()

  const clickHandler = () => {
    setSelected({
      ...contact,
      messages: null,
    })
  }

  const loadImage = () => {
    return imageRef.current
      ? (imageRef.current.style.clipPath = "circle(100% at center")
      : ""
  }

  return (
    <StyledContact
      onClick={clickHandler}
      className={selected && selected.name === contact.name ? "selected" : ""}
      tabIndex={0}
    >
      <div className="profile">
        <img
          ref={imageRef}
          loading="lazy"
          decoding="async"
          onLoad={loadImage}
          src={contact.profilePicture.thumbnail}
          alt="contact profile"
        />
      </div>
      <div className="content">
        <h3>{contact.name}</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
          voluptatem, consectetur vitae suscipit facere quam cumque quis
          molestiae accusantium dolore.
        </p>
      </div>
    </StyledContact>
  )
}

const StyledContact = styled.li`
  width: 100%;
  padding: calc(var(--conversationsWidth) / 22)
    calc(var(--conversationsWidth) / 38.46);

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  background: rgb(16, 16, 16, 0.4);

  border-bottom: 1px solid #0004;
  transform-origin: left;
  transition: all 0.2s;

  cursor: pointer;

  &:hover,
  &:focus {
    background: linear-gradient(
      to left,
      rgba(255, 226, 89, 0.5),
      rgba(255, 167, 81, 0.5)
    );
  }

  .profile {
    width: var(--contactImageSize);
    height: var(--contactImageSize);
    border-radius: 50%;

    align-self: center;
    background: rgb(44, 44, 44);
    overflow: hidden;
    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      object-fit: cover;
      clip-path: circle(0);
      transition: all 0.2s;
    }
  }

  .content {
    width: 50%;
    height: var(--contactImageSize);

    flex: 1;
    color: white;

    font-family: var(--fontContent);

    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;

    overflow: hidden;

    margin-left: 1em;
    h3 {
      width: 100%;
      font-weight: 400;
      font-size: var(--contactNameSize);
      color: #fffd;
      word-break: break-word;
    }
    p {
      width: 100%;

      margin-top: calc(var(--contactTextSize) / 2.5);
      font-weight: 400;
      font-size: var(--contactTextSize);
      line-height: 1;
      color: rgba(211, 211, 211, 0.8);
      word-break: break-word;
      overflow: hidden;
    }
  }
`

export default Contact
