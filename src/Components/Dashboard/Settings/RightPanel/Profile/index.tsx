import styled from "styled-components"
import LeftColumn from "./LeftColumn"
import RightColumn from "./RightColumn"

const Profile: React.FC = () => {
  return (
    <StyledProfile>
      <header>
        <h1>Profile</h1>
        <div className="line"></div>
      </header>
      <div className="profileContent">
        <LeftColumn />
        <RightColumn />
      </div>
    </StyledProfile>
  )
}

const StyledProfile = styled.section`
  width: 100%;
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
    height: 70vh;

    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    .column {
      width: 50%;
      height: 100%;
      form {
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
      }
    }
  }
`

export default Profile
