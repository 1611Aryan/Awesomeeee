import axios from "axios"
import React, { useRef, useState } from "react"
import { useEffect } from "react"

import styled from "styled-components"
import { useUser } from "../../../../../Providers/UserProvider"

const ProfilePicture: React.FC = () => {
  const profileChangeUrl =
    process.env.NODE_ENV === "production"
      ? "https://awesomeeeee.herokuapp.com/user/profilePicture"
      : "http://localhost:5000/user/profilePicture"

  //Ref
  const inputFileRef = useRef<HTMLInputElement>(null)

  const { user } = useUser()

  //State
  const [profilePicture, setProfilePicture] = useState<{
    src: string
    file: any
  }>({
    src: user ? user.profilePicture.large : "",
    file: null,
  })

  //Handlers
  const chooseProfilePicture = () => {
    if (inputFileRef.current) inputFileRef.current.click()
  }

  const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfilePicture(() => ({
      file: e.target.files && e.target.files[0] ? e.target.files[0] : null,
      src:
        e.target.files && e.target.files[0]
          ? URL.createObjectURL(e.target.files[0])
          : "",
    }))
  }

  const submitProfilePicture = async (formData: FormData) => {
    try {
      const res = await axios.patch(profileChangeUrl, formData, {
        withCredentials: true,
      })
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (profilePicture.file)
      (async () => {
        const formData = new FormData()
        formData.append("avatar", profilePicture.file, profilePicture.file.name)
        await submitProfilePicture(formData)
      })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profilePicture])

  return (
    <StyledProfilePicture>
      <form encType="multpart/form-data" onSubmit={e => e.preventDefault()}>
        <StyledProfilePictureContainer>
          <img onClick={chooseProfilePicture} src={profilePicture.src} alt="" />
          <label htmlFor="avatar"></label>
          <input
            type="file"
            name="avatar"
            ref={inputFileRef}
            onChange={changeHandler}
          />
        </StyledProfilePictureContainer>
        <div className="buttonContainer">
          <button type="button" onClick={chooseProfilePicture}>
            Change Profile Picture
          </button>

          <button type="button">Remove Profile Picture</button>
        </div>
      </form>
    </StyledProfilePicture>
  )
}

const StyledProfilePicture = styled.div`
  width: 100%;

  --imgSize: 0.4;

  form {
    width: 100%;
    height: calc(var(--RightPanelWidth) * 85.7 / 100 * var(--imgSize) - 5.5em);

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .buttonContainer {
    width: calc(100% * var(--imgSize));

    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;
    gap: 2em;
    button {
      border: 0;
      border-radius: 5px;
      padding: 0.75em;

      font-size: 1.05em;
      color: white;

      &:focus {
        outline: 0;
      }
      &:nth-of-type(1) {
        background: linear-gradient(
          to right,
          rgba(123, 7, 194, 0.8) 30%,
          rgba(51, 70, 167, 0.8) 100%
        );
      }
      &:nth-of-type(2) {
        background: linear-gradient(
          to right,
          rgba(255, 226, 89, 0.7) 30%,
          rgba(255, 167, 81, 0.7) 100%
        );
      }
    }
  }
`

const StyledProfilePictureContainer = styled.div`
  width: calc(100% * var(--imgSize));

  border-radius: 7px;

  overflow: hidden;
  position: relative;

  input,
  label {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
  }
  img {
    width: 100%;
    height: 100%;

    background: rgba(0, 0, 0, 0.2);

    border-radius: 7px;
    object-fit: cover;
    position: relative;
    z-index: 2;
  }
`

export default ProfilePicture
