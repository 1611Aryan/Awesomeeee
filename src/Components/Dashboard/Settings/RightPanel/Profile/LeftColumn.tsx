import axios from "axios"
import React, { useRef, useState } from "react"
import { useEffect } from "react"

import styled from "styled-components"
import { useUser } from "../../../../../Providers/UserProvider"

const LeftColumn: React.FC = () => {
  const profileChangeUrl = "http://localhost:5000/user/profilePicture"

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
  }, [profilePicture])

  return (
    <StyledLeftColumn className="column">
      <form encType="multpart/form-data" onSubmit={e => e.preventDefault()}>
        <h3>Profile Picture:</h3>

        <div className="profilePictureContainer">
          <img onClick={chooseProfilePicture} src={profilePicture.src} alt="" />
          <input
            type="file"
            name="avatar"
            ref={inputFileRef}
            onChange={changeHandler}
          />
        </div>

        <div className="buttonContainer">
          <button type="button" onClick={chooseProfilePicture}>
            Change Profile Picture
          </button>

          <button type="button">Remove Profile Picture</button>
        </div>
      </form>
    </StyledLeftColumn>
  )
}

const StyledLeftColumn = styled.div`
  h3 {
    font-weight: 400;
    font-size: 1.5em;
    color: rgba(255, 255, 255, 0.8);
  }

  .profilePictureContainer {
    width: 60%;
    height: calc((var(--RightPanelWidth) / 2 - 2em) * 0.6);

    margin: 4em 0 3em;

    border-radius: 50%;

    background: rgba(255, 255, 255, 0.7);
    overflow: hidden;
    position: relative;

    input {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: relative;
      z-index: 2;
    }
  }

  .buttonContainer {
    width: 60%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1em;
    button {
      border: 0;
      border-radius: 10px;
      padding: 0.5em 1em;

      font-size: 1em;
      color: white;

      &:focus {
        outline: 0;
      }
      &:nth-of-type(1) {
        background: linear-gradient(
          to right,
          rgba(16, 16, 16, 0.5),
          rgba(36, 4, 56, 0.5)
        );
      }
      &:nth-of-type(2) {
        background: linear-gradient(
          to right,
          rgba(255, 226, 89, 0.5),
          rgba(255, 167, 81, 0.5)
        );
      }
    }
  }
`

export default LeftColumn
