import { StyledContent, StyledHeader, StyledSection } from "../Styles"
import Form from "./Form"

const PersonalInfo: React.FC = () => {
  return (
    <StyledSection id="info">
      <StyledHeader>
        <h1>Personal Info</h1>
        <div className="line"></div>
      </StyledHeader>
      <StyledContent>
        <Form />
      </StyledContent>
    </StyledSection>
  )
}

export default PersonalInfo
