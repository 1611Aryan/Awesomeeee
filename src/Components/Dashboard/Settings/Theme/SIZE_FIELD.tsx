import styled from "@emotion/styled"
import { useEffect, useState } from "react"

const SIZE_FIELD: React.FC = () => {
  const [size, setSize] = useState("")

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSize(() => {
      switch (e.target.value) {
        case "0":
          document.querySelector("html")?.setAttribute("theme", "small")
          return "Small"
        case "5":
          document.querySelector("html")?.setAttribute("theme", "medium")
          return "Medium"
        case "10":
          document.querySelector("html")?.setAttribute("theme", "large")
          return "Large"
        default:
          document.querySelector("html")?.setAttribute("theme", "small")
          return "Small"
      }
    })
  }

  useEffect(() => {
    setSize(() => {
      switch (document.querySelector("html")?.getAttribute("theme")) {
        case "small":
          return "Small"
        case "medium":
          return "Medium"
        case "large":
          return "Large"
        default:
          return "Small"
      }
    })
  }, [])

  return (
    <STYLED_SIZE_FIELD>
      <label htmlFor="size">Size:</label>
      <span className="input">{size}</span>
      <input
        type="range"
        min="0"
        max="10"
        step="5"
        onChange={changeHandler}
        value={
          size === "Small"
            ? "0"
            : size === "Medium"
            ? "5"
            : size === "Large"
            ? "10"
            : "0"
        }
      />
    </STYLED_SIZE_FIELD>
  )
}

const STYLED_SIZE_FIELD = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  input[type="range"] {
    -webkit-appearance: none;
    width: 40%;
    background: transparent;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  input[type="range"]:focus {
    outline: none;
  }

  input[type="range"]::-ms-track {
    width: 100%;
    cursor: pointer;

    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;

    height: 1.3em;
    width: 0.4em;
    border-radius: 5px;
    background: #ffffff;
    cursor: pointer;

    margin-top: -0.5em;
  }

  input[type="range"]::-moz-range-thumb {
    height: 1.3em;
    width: 0.4em;
    border-radius: 5px;
    background: #ffffff;
    cursor: pointer;

    border: none;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 0.4em;
    cursor: pointer;
    background: #ffffff33;
    border-radius: 5px;
    transition: all 0.2s;
  }

  input[type="range"]:focus::-webkit-slider-runnable-track {
    background: #fff5;
  }

  input[type="range"]::-moz-range-track {
    width: 100%;
    height: 0.4em;
    cursor: pointer;
    background: #ffffff33;
    border-radius: 5px;
  }
`

export default SIZE_FIELD
