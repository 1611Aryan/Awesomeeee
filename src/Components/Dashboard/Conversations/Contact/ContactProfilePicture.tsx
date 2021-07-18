import { useRef } from "react"
import styled from "styled-components"

const ContactProfilePicture: React.FC<{
  profilePicture: {
    large: string
    thumbnail: string
  }
}> = ({ profilePicture }) => {
  const imageRef = useRef<HTMLImageElement>(null)

  const loadImage = () =>
    imageRef.current ? imageRef.current.classList.add("visible") : ""

  return (
    <StyleProfilePicture>
      <img
        ref={imageRef}
        loading="lazy"
        decoding="async"
        onLoad={loadImage}
        src={profilePicture.thumbnail}
        alt="contact profile"
      />
    </StyleProfilePicture>
  )
}

const StyleProfilePicture = styled.div`
  width: var(--contactImageSize);
  height: var(--contactImageSize);
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
    transition: all ease 0.2s;
  }
`

export default ContactProfilePicture
