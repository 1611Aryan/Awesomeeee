import { StyledContent, StyledHeader, StyledSection } from "../Styles"
import Form from "./Form"

const MyAccount = () => {
  return (
    <StyledSection id="myAccount">
      <StyledHeader>
        <h1>My Account</h1>
        <div className="line"></div>
      </StyledHeader>
      <StyledContent>
        <Form />
      </StyledContent>
    </StyledSection>
  )
}
export default MyAccount
