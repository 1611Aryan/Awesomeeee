import styled from "styled-components"
import { useState } from "react"

import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css"
import DatePicker, {
  DayValue,
} from "@hassanmojab/react-modern-calendar-datepicker"

const DOB_FIELD: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<DayValue>(null)

  const renderCustomInput = ({ ref }: { ref: any }) => (
    <input
      readOnly
      ref={ref} // necessary
      placeholder="Change"
      value="Change"
      style={{
        width: "8ch",
        textAlign: "center",
        boxSizing: "content-box",
        padding: "0.65em 0.5em",
        fontSize: "0.9em",
        fontWeight: 500,
        borderRadius: "3px",
        color: "white",
        outline: "none",
        background: "linear-gradient(90deg, #6575ff, #4c5eff)",
        cursor: "pointer",
      }}
      className="my-custom-input-class"
    />
  )

  return (
    <STYLED_DOB_FIELD>
      <div>
        <p className="label">Date of Birth</p>
        <p className="input">{`${selectedDay?.day}/${selectedDay?.month}/${selectedDay?.year}`}</p>
      </div>

      <DatePicker
        value={selectedDay}
        onChange={setSelectedDay}
        renderInput={renderCustomInput}
        calendarClassName="responsive-calendar"
      />
    </STYLED_DOB_FIELD>
  )
}
const STYLED_DOB_FIELD = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .responsive-calendar {
    margin-top: -1.5em;
    font-size: 8px;
  }
`

export default DOB_FIELD
