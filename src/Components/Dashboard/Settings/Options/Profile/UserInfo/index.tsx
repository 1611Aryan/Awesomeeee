import React, { useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { rootState } from "../../../../../../Reducers"

import Field from "./Field"

const UserInfo: React.FC = () => {
  const user = useSelector((state: rootState) => state.user)

  const [info, setInfo] = useState({
    username: user ? user.username : "",
    email: user ? user.email : "",
    phone: "1234567890",
  })

  return (
    <StyledUserInfo className="column">
      <form tabIndex={0}>
        <Field
          name={"username"}
          value={info.username}
          info={info}
          setInfo={setInfo}
        />
        <Field
          name={"email"}
          value={info.email}
          info={info}
          setInfo={setInfo}
        />
        <Field
          name={"phone"}
          value={info.phone}
          info={info}
          setInfo={setInfo}
        />
      </form>
    </StyledUserInfo>
  )
}

const StyledUserInfo = styled.div`
  margin-top: 3em;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 7px;
  form {
    width: 100%;
    padding: 1em 1.5em;
  }
  .fieldContainer {
  }
`

export default UserInfo
