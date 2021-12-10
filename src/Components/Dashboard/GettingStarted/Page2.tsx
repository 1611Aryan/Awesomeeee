import { actionsUser, userI } from "Actions/userActions"
import { profileSetup } from "API_Endpoints"
import axios from "axios"
import Profile from "Media/PNG/profile.png"

import React, { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"

const Page2: React.FC<{
  formData: FormData
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ formData, setLoading }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [profilePicture, setProfilePicture] = useState<{
    src: string
    file: null | File
    default: boolean
  }>({
    src: Profile,
    file: null,
    default: true,
  })

  const dispatch = useDispatch()

  const chooseImage = () => {
    inputRef.current?.click()
  }

  const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0])
      setProfilePicture({
        file: e.target.files[0],
        src: URL.createObjectURL(e.target.files[0]),
        default: false,
      })
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    formData.append("isDefault", profilePicture.default.toString())
    if (profilePicture.file && !profilePicture.default)
      formData.append("avatar", profilePicture.file, profilePicture.file.name)

    try {
      const res = await axios[profileSetup.METHOD]<{
        profileSetup: boolean
        profilePicture: userI["profilePicture"]
      }>(profileSetup.URL, formData, {
        withCredentials: true,
      })

      if (res.data.profileSetup) {
        dispatch({
          type: actionsUser.UPDATE_USER,
          payload: {
            properties: [
              {
                key: "profileSetup",
                value: res.data.profileSetup,
              },
              {
                key: "profilePicture",
                value: res.data.profilePicture,
              },
            ],
          },
        })
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(
    () => () => URL.revokeObjectURL(profilePicture.src),
    [profilePicture]
  )

  return (
    <StyledPage1>
      <h1>Just One More Moment</h1>
      <div className="content">
        <div onClick={chooseImage} className="imageContainer">
          <img src={profilePicture.src} alt="Greetings" />
        </div>
        <form encType="multpart/form-data" onSubmit={submitHandler}>
          <div className="fieldContainer">
            <label htmlFor="username">Profile Picture</label>
            <input
              ref={inputRef}
              name="profilePicture"
              type="file"
              onChange={changeHandler}
            />
          </div>
          <button type="button" onClick={chooseImage}>
            Change Profile Picture
          </button>
          <button>Finish Setup</button>
        </form>
      </div>
    </StyledPage1>
  )
}

const StyledPage1 = styled.div`
  width: calc(var(--pageWidth) - 2 * var(--paddingRight));
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;

  h1 {
    color: #fff;
    font-family: var(--fontHeading);
    font-size: 3em;
    line-height: 1;
  }

  .content {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    form {
      width: 40%;

      * + * {
        margin: 1em 0;
      }

      font-family: var(--fontContent);
      .fieldContainer {
        position: absolute;
        visibility: hidden;
        margin: 0;
        width: 0;
        height: 0;
        label {
          margin: 0;
          width: 0;
          height: 0;
        }
        input {
          margin: 0;
          width: 0;
          height: 0;
        }
      }
      button {
        width: 25ch;
        padding: 0.9em 1.5em;
        border-radius: 5px;
        font-size: 1.1em;
        color: #fff;

        box-shadow: inset -2px -2px 4px rgba(0, 0, 0, 0.25),
          inset 2px 2px 4px rgba(0, 0, 0, 0.25);

        &:nth-of-type(1) {
          background: linear-gradient(90deg, #5cc8d6 0.01%, #46b3b9 99.97%);
        }
        &:nth-of-type(2) {
          background: linear-gradient(90deg, #fcd462 0.01%, #f7be56 99.97%);
        }
      }
    }

    .imageContainer {
      width: calc((var(--pageWidth) - 2 * var(--paddingRight)) * 0.4);
      height: calc((var(--pageWidth) - 2 * var(--paddingRight)) * 0.4);

      position: relative;

      border-radius: 50%;
      overflow: hidden;

      background: rgba(219, 219, 219, 0.5);

      img {
        width: 100%;
        aspect-ratio: 1/1;
        object-fit: cover;

        cursor: pointer;
      }
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;

        box-shadow: inset -4px -4px 10px rgba(0, 0, 0, 0.1),
          inset 4px -4px 10px rgba(0, 0, 0, 0.1),
          inset -4px 4px 10px rgba(0, 0, 0, 0.1),
          inset 4px 4px 10px rgba(0, 0, 0, 0.1);
        pointer-events: none;
      }
    }
  }
`

export default Page2
