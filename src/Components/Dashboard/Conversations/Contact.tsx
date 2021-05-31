import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Contact: React.FC<{
  contact: {
    name: string;
    message: string;
  };
  selected: {
    name: string;
    img: string;
  } | null;
  setSelected: React.Dispatch<
    React.SetStateAction<{
      name: string;
      img: string;
    } | null>
  >;
}> = ({ contact, setSelected, selected }) => {
  const [random, setRandom] = useState<number>();

  const imageRef = useRef<HTMLImageElement>(null);

  const length = 1409;

  useEffect(() => {
    setRandom(Math.floor(Math.random() * length));
  }, []);

  const clickHandler = () => {
    setSelected({
      name: contact.name,
      img: `https://source.unsplash.com/collection/4457310/250x250/?sig=${random}`,
    });
  };

  return (
    <StyledContact
      onClick={clickHandler}
      className={selected && selected.name === contact.name ? "selected" : ""}
    >
      <div className="profile">
        <img
          ref={imageRef}
          onLoad={() =>
            imageRef.current
              ? (imageRef.current.style.clipPath = "circle(100% at center")
              : ""
          }
          src={
            random
              ? `https://source.unsplash.com/collection/4457310/250x250/?sig=${random}`
              : ""
          }
          alt="contact profile"
        />
      </div>
      <div className="content">
        <h3>{contact.name}</h3>
        <p>{contact.message}</p>
      </div>
    </StyledContact>
  );
};

const StyledContact = styled.li`
  width: 100%;
  padding: calc(var(--conversationsWidth) / 22)
    calc(var(--conversationsWidth) / 38.46);

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  background: rgb(16, 16, 16, 0.5);
  border-radius: 5px;

  margin: calc(var(--conversationsWidth) / 75) 0;

  cursor: pointer;

  &:hover {
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
    max-height: calc(100% - 10vh);

    flex: 1;
    color: white;

    font-family: var(--fontContent);

    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;

    margin-left: 1em;
    h3 {
      width: 100%;
      font-weight: 400;
      font-size: var(--contactNameSize);
    }
    p {
      width: 100%;
      height: auto;
      max-height: 2em;
      margin-top: calc(var(--contactTextSize) / 2.5);
      font-weight: 300;
      font-size: var(--contactTextSize);
      line-height: 1;
      color: rgba(255, 255, 255, 0.8);
      overflow: hidden;
    }
  }
`;

export default Contact;
