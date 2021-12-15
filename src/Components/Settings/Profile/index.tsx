import { StyledHeader, StyledSection, StyledContent } from "../Styles"
import ProfilePicture from "./ProfilePicture"
import UserInfo from "./UserInfo"

const Profile: React.FC = () => {
  return (
    <StyledSection id="profile">
      <StyledHeader>
        <h1>Profile</h1>
        <div className="line"></div>
      </StyledHeader>
      <StyledContent>
        <ProfilePicture />
        <UserInfo />
      </StyledContent>
    </StyledSection>
  )
}

export default Profile
