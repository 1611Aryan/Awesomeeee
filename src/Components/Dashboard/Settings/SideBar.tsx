import { HiArrowLeft } from "react-icons/hi"
import { AiFillFormatPainter } from "react-icons/ai"
import { CgProfile, CgInfo } from "react-icons/cg"
import { IoMdLock } from "react-icons/io"
import styled from "styled-components"
import { useState } from "react"
import { Link } from "react-router-dom"

const SideBar = () => {
  const [selected, setSelected] = useState("profile")

  const selectOption = (option: string) =>
    option === selected ? "selected" : ""

  return (
    <StyledOptions>
      <div className="back">
        <Link to="/dashboard">
          <HiArrowLeft className="backButton" />
        </Link>
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
            <a href="#profile">
              <CgProfile />
              <span>My Profile</span>{" "}
            </a>
          </li>
          <li
            tabIndex={0}
            className={selectOption("info")}
            onFocus={() => setSelected("info")}
            onClick={() => setSelected("info")}
          >
            <a href="#info">
              <CgInfo />
              <span>Personal Info</span>
            </a>
          </li>
          <li
            tabIndex={0}
            className={selectOption("theme")}
            onFocus={() => setSelected("theme")}
            onClick={() => setSelected("theme")}
          >
            <a href="#theme">
              <AiFillFormatPainter />
              <span>Theme</span>
            </a>
          </li>
          <li
            tabIndex={0}
            className={selectOption("myAccount")}
            onFocus={() => setSelected("myAccount")}
            onClick={() => setSelected("myAccount")}
          >
            <a href="#myAccount">
              <IoMdLock />
              <span>My Account</span>
            </a>
          </li>
        </ul>
      </div>
    </StyledOptions>
  )
}

const StyledOptions = styled.section`
  width: var(--LeftPanelWidth);
  height: 100vh;
  padding: clamp(0.75em, 2vw, 1.5em) 0;

  overflow: hidden;

  font-family: var(--fontContent);

  border-right: 1px solid rgba(255, 255, 255, 0.8);
  background: rgba(0, 0, 0, 0.2);

  .back {
    width: 35%;
    text-align: right;
    .backButton {
      font-size: clamp(1em, 3vw, 1.75em);
      color: rgba(255, 255, 255, 0.8);
      cursor: pointer;
    }
  }

  .content {
    margin-left: 40%;
  }

  h1 {
    margin: clamp(0.2em, 1vw, 0.5em) 0 clamp(0.5em, 2vw, 0.75em);
    font-size: clamp(1.25em, 4vw, 3em);
    color: #fff;
  }

  ul {
    width: 100%;
    list-style-type: none;
    padding: 0 clamp(0.25em, 1vw, 1em);

    li {
      width: 100%;
      color: rgba(255, 255, 255, 0.9);

      margin: clamp(0.15em, 0.75vw, 0.25em) 0;

      border-radius: 2px;

      cursor: pointer;

      font-size: clamp(0.8em, 2vw, 1.25em);

      transition: all 0.2s;
      a {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        padding: clamp(0.5em, 1vw, 0.75em) clamp(0.5em, 1vw, 0.75em)
          clamp(0.5em, 1vw, 0.75em) 0.5em;
      }
      svg {
        transition: all 0.2s;
      }
      span {
        font-size: clamp(0.7em, 1vw, 0.9em);
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

  @media only screen and (max-width: 500px) {
    padding: clamp(0.75em, 2vw, 1.5em) 0.5em;
    .back {
      width: 100%;
      text-align: left;
    }

    .content {
      margin-left: 00%;
    }
  }
`

export default SideBar
