import { BsFillCaretLeftFill } from "react-icons/bs"
import { AiFillFormatPainter } from "react-icons/ai"
import { CgProfile, CgInfo } from "react-icons/cg"
import styled from "styled-components"
import { useState } from "react"

const Options: React.FC<{
  setSettingsActive: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setSettingsActive }) => {
  const [selected, setSelected] = useState("profile")

  const closeSettings = () => {
    setSettingsActive(false)
  }

  const selectOption = (option: string) =>
    option === selected ? "selected" : ""

  return (
    <StyledOptions>
      <BsFillCaretLeftFill className="backButton" onClick={closeSettings} />
      <h1>Settings</h1>

      <ul>
        <li
          className={selectOption("profile")}
          onClick={() => setSelected("profile")}
        >
          <CgProfile />
          <span>My Profile</span>
        </li>
        <li
          className={selectOption("info")}
          onClick={() => setSelected("info")}
        >
          <CgInfo />
          <span>Personal Info</span>
        </li>
        <li
          className={selectOption("theme")}
          onClick={() => setSelected("theme")}
        >
          <AiFillFormatPainter />
          <span>Theme</span>
        </li>
      </ul>
    </StyledOptions>
  )
}

const StyledOptions = styled.section`
  width: var(--LeftPanelWidth);
  height: 100vh;
  padding: 1.5em 1em;

  overflow: hidden;

  font-family: var(--fontContent);

  border-right: 1px solid rgba(255, 255, 255, 0.8);

  .backButton {
    font-size: 1.5em;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
  }

  h1 {
    margin: 0.5em 0 0.75em;
    font-size: 3em;
    color: #fff;
  }

  ul {
    list-style-type: none;

    li {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      color: rgba(255, 255, 255, 0.8);

      margin: 1.5em 0;
      padding: 0.35rem 0.5rem;

      border-radius: 25px;

      cursor: pointer;
      svg {
        font-size: 1.75em;
      }
      span {
        font-size: 1.25em;
        margin-left: 1em;
        font-weight: 300;
      }
    }
    .selected {
      background: #1d1d1d;
    }
  }
`

export default Options
