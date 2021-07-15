import { StyledHeader, StyledSection, StyledContent } from "../Styles"
import Form from "./Form"

const Theme: React.FC = () => {
  return (
    <StyledSection id="theme">
      <StyledHeader>
        <h1>Theme</h1>
        <div className="line"></div>
      </StyledHeader>
      <StyledContent>
        <Form />
      </StyledContent>
    </StyledSection>
  )
}

export default Theme
