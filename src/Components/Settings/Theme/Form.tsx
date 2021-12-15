import { StyledForm } from "../Styles"
import COLOR_PALETTE_FIELD from "./COLOR_PALETTE_FIELD"
import FONT_FIELD from "./FONT_FIELD"
import SIZE_FIELD from "./SIZE_FIELD"

const Form: React.FC = () => {
  return (
    <StyledForm>
      <SIZE_FIELD />
      <COLOR_PALETTE_FIELD />
      <FONT_FIELD />
    </StyledForm>
  )
}
export default Form
