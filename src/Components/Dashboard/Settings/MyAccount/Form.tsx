import { useState } from "react"
import ChangePasswordModal from "./ChangePassword"
import DeleteField from "./DeleteField"
import PasswordField from "./PasswordField"

const Form = () => {
  const [passwordModalVis, setPasswordModalVis] = useState(false)

  return (
    <div className="form">
      <PasswordField setPasswordModalVis={setPasswordModalVis} />
      <DeleteField />
      {passwordModalVis && (
        <ChangePasswordModal setPasswordModalVis={setPasswordModalVis} />
      )}
    </div>
  )
}

export default Form
