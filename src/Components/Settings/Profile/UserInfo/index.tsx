import useTypedSelector from "Hooks/useTypedSelector"
import React, { useState } from "react"
import styled from "@emotion/styled"
import { StyledForm } from "../../Styles"

import Field from "./Field"

const UserInfo: React.FC = () => {
  const { user } = useTypedSelector(state => state.user)

  const [info, setInfo] = useState({
    username: user ? user.username : "",
    email: user ? user.email : "",
    phone: "1234567890",
  })

  return (
    <ReStyledForm tabIndex={0}>
      <Field
        name={"username"}
        value={info.username}
        info={info}
        setInfo={setInfo}
      />
      <Field name={"email"} value={info.email} info={info} setInfo={setInfo} />
      <Field name={"phone"} value={info.phone} info={info} setInfo={setInfo} />
    </ReStyledForm>
  )
}

const ReStyledForm = styled(StyledForm)`
  margin-top: clamp(1em, 3vw, 2em);
`

export default UserInfo
