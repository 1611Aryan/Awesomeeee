import React, { useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { rootState } from "Reducers"
import { StyledForm } from "../../Styles"

import Field from "./Field"

const UserInfo: React.FC = () => {
  const user = useSelector((state: rootState) => state.user)

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
