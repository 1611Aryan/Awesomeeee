import styled from "styled-components"
import MyAccount from "./MyAccount"
import PersonalInfo from "./Personal_Info"
import Profile from "./Profile"
import Theme from "./Theme"

const Content: React.FC = () => {
  return (
    <StyledContent>
      <Profile />
      <PersonalInfo />
      <Theme />
      <MyAccount />
    </StyledContent>
  )
}

const StyledContent = styled.section`
  width: var(--RightPanelWidth);
  height: 100vh;
  padding-right: 14.2%;

  overflow: hidden auto;

  scroll-behavior: smooth;

  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 10px;
    background: #0008;
  }

  &::-webkit-scrollbar-thumb {
    background: #fff8;
    border-radius: 5px;
  }
`

export default Content
