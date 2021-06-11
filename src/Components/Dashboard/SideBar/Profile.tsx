import styled from "styled-components";
import Options from "./Options";

const Profile: React.FC = () => {
  return (
    <StyledProfile tabIndex={1}>
      <Options />
      <div className="imgContainer">
        <img
          src="https://source.unsplash.com/collection/1718802/450x450"
          alt=""
        />
      </div>
    </StyledProfile>
  );
};

const StyledProfile = styled.div`
  width: 100%;
  height: 16vh;

  border-radius: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  overflow: hidden;

  .imgContainer {
    width: calc(var(--sideBarWidth) - 1em);
    height: calc(var(--sideBarWidth) - 1em);
    max-height: calc(10vw - 1em);

    z-index: 2;
    img {
      width: 100%;
      height: 100%;

      border-radius: 50%;
      object-fit: cover;
      border: 1px solid #fff;
    }
  }

  &:focus,
  &:focus-within {
    .options {
      background: #8b959d !important;
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0%) scaleY(2);
    }
  }
`;

export default Profile;
