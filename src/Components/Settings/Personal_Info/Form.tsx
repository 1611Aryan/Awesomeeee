import { StyledForm } from "../Styles"
import BIO_FIELD from "./BIO_FIELD"
import DOB_FIELD from "./DOB_FIELD"

const Form: React.FC = () => {
  return (
    <StyledForm>
      <DOB_FIELD />
      <BIO_FIELD />
    </StyledForm>
  )
}

export default Form
