import React, { useState } from "react"
import styled from "styled-components"
import { useUser } from "../../../../../../Providers/UserProvider"
import Field from "./Field"

const UserInfo: React.FC = () => {
  const { user } = useUser()

  const [info, setInfo] = useState({
    username: user?.username,
    email: user?.email,
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
