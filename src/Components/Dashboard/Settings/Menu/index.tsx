import { HiArrowLeft } from "react-icons/hi"
import { AiFillFormatPainter } from "react-icons/ai"
import { CgProfile, CgInfo } from "react-icons/cg"
import styled from "styled-components"
import { useState } from "react"

const Menu: React.FC<{
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
      <div className="back">
        <HiArrowLeft className="backButton" onClick={closeSettings} />
      </div>
      <div className="content">
        <h1>Settings</h1>

        <ul>
          <li
            tabIndex={0}
            className={selectOption("profile")}
            onFocus={() => setSelected("profile")}
            onClick={() => setSelected("profile")}
          >
            <CgProfile />
            <span>My Profile</span>
          </li>
          <li
            tabIndex={0}
            className={selectOption("info")}
            onFocus={() => setSelected("info")}
            onClick={() => setSelected("info")}
          >
            <CgInfo />
            <span>Personal Info</span>
          </li>
          <li
            tabIndex={0}
            className={selectOption("theme")}
            onFocus={() => setSelected("theme")}
            onClick={() => setSelected("theme")}
          >
            <AiFillFormatPainter />
            <span>Theme</span>
          </li>
        </ul>
      </div>
    </StyledOptions>
  )
}

const StyledOptions = styled.section`
  width: var(--LeftPanelWidth);
  height: 100vh;
  padding: 1.5em 0;

  overflow: hidden;

  font-family: var(--fontContent);

  border-right: 1px solid rgba(255, 255, 255, 0.8);
  background: rgba(0, 0, 0, 0.2);

  .back {
    width: 35%;
    text-align: right;
    .backButton {
      font-size: 1.75em;
      color: rgba(255, 255, 255, 0.8);
      cursor: pointer;
    }
  }

  .content {
    margin-left: 40%;
  }

  h1 {
    margin: 0.5em 0 0.75em;
    font-size: 3em;
    color: #fff;
  }

  ul {
    list-style-type: none;
    padding: 0 1em;
    li {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      color: rgba(255, 255, 255, 0.9);

      margin: 0.25em 0;
      padding: 0.75rem 0.75em 0.75em 0.5em;

      border-radius: 2px;

      cursor: pointer;

      font-size: 1.25em;

      transition: all 0.2s;
      svg {
        transition: all 0.2s;
      }
      span {
        font-size: 0.9em;
        font-weight: 300;
        margin-left: 0.5em;
        transition: all 0.1s;
      }
    }
    .selected {
      transform-origin: right bottom;
      transform: scale(1.1);
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
    }
  }
`

export default Menu
