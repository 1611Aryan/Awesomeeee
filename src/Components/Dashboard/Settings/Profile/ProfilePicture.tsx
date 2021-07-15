import axios from "axios"
import React, { useRef, useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import styled from "styled-components"
import { actionsUser } from "../../../../Actions/userActions"
import { updateProfilePicture } from "../../../../API_Endpoints"
import { rootState } from "../../../../Reducers"

const ProfilePicture: React.FC = () => {
  //Ref
  const inputFileRef = useRef<HTMLInputElement>(null)

  const { user } = useSelector((state: rootState) => state)
  const dispatch = useDispatch()

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
      const res = await axios[updateProfilePicture.METHOD](
        updateProfilePicture.URL,
        formData,
        {
          withCredentials: true,
        }
      )
      console.log(res)
      dispatch({
        type: actionsUser.UPDATE_USER,
        payload: {
          property: {
            key: "profilePicture",
            value: {
              thumbnail: profilePicture.src,
              large: profilePicture.src,
            },
          },
        },
      })
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
  height: calc(var(--RightPanelWidth) * 85.7 / 100 * var(--imgSize) - 5.5em);
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
