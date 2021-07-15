import styled from "styled-components"
import { IoCalendar } from "react-icons/io5"
import { StyledButton } from "../Styles"

const DOB_FIELD: React.FC = () => {
  return (
    <STYLED_DOB_FIELD>
      <div>
        <p className="label">Date of Birth</p>
        <p className="input">16/11/2001</p>
      </div>
      <ReStyledButton type="button">
        <IoCalendar />
      </ReStyledButton>
    </STYLED_DOB_FIELD>
  )
}
const STYLED_DOB_FIELD = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ReStyledButton = styled(StyledButton)`
  background: linear-gradient(90deg, #6575ff, #4c5eff);
  svg {
    font-size: 1.3em;
    color: #fff;
  }
`

export default DOB_FIELD
