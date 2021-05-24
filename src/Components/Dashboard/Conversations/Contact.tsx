import { useEffect, useState } from "react";
import styled from "styled-components";

const Contact: React.FC = () => {
  const [random, setRandom] = useState<number>();

  useEffect(() => {
    setRandom(Math.floor(Math.random() * 45));
  }, []);

  return (
    <StyledContact>
      <div className="profile">
        <img
          src={
            random
              ? `https://source.unsplash.com/collection/1718802/250x250/?sig=${random}`
              : ""
          }
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="content">
        <h3>Lorem</h3>
        <p>
          Vestibulum, sit et varius magna gravida eget. Lorem fermentum sed
          Lorem, ipsum dolor.dwd
        </p>
      </div>
    </StyledContact>
  );
};

const StyledContact = styled.li`
  margin: 0.75em 0;
  width: 100%;
  padding: 1em 0.65em;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  background: rgb(16, 16, 16, 0.5);
  border-radius: 5px;

  .profile {
    width: 20%;
    height: 100%;
    border-radius: 50%;

    img {
      width: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .content {
    max-width: 80%;

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
      font-size: 1.25em;
    }
    p {
      width: 100%;
      height: auto;
      margin-top: 1em;
      font-weight: 100;
      font-size: 0.8em;
    }
  }
`;

export default Contact;
