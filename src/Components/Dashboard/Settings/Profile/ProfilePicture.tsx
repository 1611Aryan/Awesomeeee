import axios from "axios"
import React, { useRef, useState, useEffect } from "react"

import styled from "@emotion/styled"

import { updateProfilePicture } from "API_Endpoints"
import useTypedSelector from "Hooks/useTypedSelector"
import useTypedDispatch from "Hooks/useTypedDispatch"
import { updateUser, userI } from "Redux/Slices/User.Slice"

const ProfilePicture: React.FC = () => {
  //Ref
  const inputFileRef = useRef<HTMLInputElement>(null)

  const { user } = useTypedSelector(state => state.user)
  const dispatch = useTypedDispatch()

  //State
  const [profilePicture, setProfilePicture] = useState<{
    src: string
    file: File
    default: boolean
  }>({
    src: user ? user.profilePicture.large : "",
    file: new File([user ? user.profilePicture.large : ""], "profile.png", {
      type: "image/png",
    }),
    default: true,
  })

  //Handlers
  const chooseProfilePicture = () => {
    if (inputFileRef.current) inputFileRef.current.click()
  }

  const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0])
      setProfilePicture({
        file: e.target.files[0],
        src: URL.createObjectURL(e.target.files[0]),
        default: false,
      })
  }

  const submitProfilePicture = async (formData: FormData) => {
    try {
      user && formData.append("fileId", user.profilePicture.fileId)
      formData.append("isDefault", profilePicture.default.toString())
      const res = await axios[updateProfilePicture.METHOD]<{
        profilePicture: userI["profilePicture"]
      }>(updateProfilePicture.URL, formData, {
        withCredentials: true,
      })

      dispatch(
        updateUser([
          {
            key: "profilePicture",
            value: res.data.profilePicture,
          },
        ])
      )
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (profilePicture.file && !profilePicture.default)
      (async () => {
        const formData = new FormData()
        formData.append("avatar", profilePicture.file, profilePicture.file.name)
        await submitProfilePicture(formData)
      })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profilePicture])

  return (
    <StyledProfilePicture>
      <form onSubmit={e => e.preventDefault()}>
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
    gap: clamp(1.5em, 3vw, 2em);
    button {
      border: 0;
      border-radius: 5px;
      padding: clamp(0.5em, 1vw, 0.75em);

      font-size: clamp(0.8em, 1vw, 1em);
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

    cursor: pointer;
  }
`

export default ProfilePicture
