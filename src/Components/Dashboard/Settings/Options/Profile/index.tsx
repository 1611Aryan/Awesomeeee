import styled from "styled-components"
import ProfilePicture from "./ProfilePicture"
import UserInfo from "./UserInfo"

const Profile: React.FC = () => {
  return (
    <StyledProfile>
      <header>
        <h1>Profile</h1>
        <div className="line"></div>
      </header>
      <div className="profileContent">
        <ProfilePicture />
        <UserInfo />
      </div>
    </StyledProfile>
  )
}

const StyledProfile = styled.section`
  width: 100%;
  height: 100%;

  padding: 2em;

  font-family: var(--fontContent);

  header {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    h1 {
      font-size: 2.5em;
      color: white;
    }

    .line {
      margin-left: 1em;
      width: 100%;
      height: 1px;
      background: linear-gradient(to bottom, #fff, transparent);
    }
  }

  .profileContent {
    margin-top: 2em;
    width: 100%;

    padding: 2em;

    border-radius: 5px;

    background: rgba(0, 0, 0, 0.2);
  }
`

export default Profile
