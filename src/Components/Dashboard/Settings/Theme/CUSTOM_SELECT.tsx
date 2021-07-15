import { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { BsCaretDownFill } from "react-icons/bs"

const CUSTOM_SELECT: React.FC<{
  options: string[]
  colorPalette: string
  setColorPalette: React.Dispatch<React.SetStateAction<string>>
}> = ({ options, colorPalette, setColorPalette }) => {
  const selectRef = useRef<HTMLDivElement>(null)

  const [active, setActive] = useState(false)

  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (active && selectRef.current) {
      const top = selectRef.current.getBoundingClientRect().top
      setHeight(window.innerHeight - top - 20)
    }
  }, [active])

  return (
    <StyledField theme={{ height }}>
      <div className="label">Color Palette</div>
      <div className="select input" ref={selectRef}>
        <div className="selected" onClick={() => setActive(true)}>
          <span>{colorPalette}</span>
          <BsCaretDownFill className="icon" />
        </div>
        {active && (
          <div className="options">
            {options.map((option, index) => (
              <span
                key={index}
                onClick={() => {
                  setColorPalette(option)
                  setActive(false)
                }}
              >
                {option}
              </span>
            ))}
          </div>
        )}
      </div>
    </StyledField>
  )
}

const StyledField = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  .select {
    border-radius: 2px;
    cursor: pointer;
    .selected {
      padding: 0.5em 0.7em;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    span {
      width: 18ch;
    }

    position: relative;
  }

  .options {
    border-radius: 2px;

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: #455464;
    z-index: 10;

    max-height: ${props => props.theme.height}px;

    overflow: hidden auto;
    span {
      width: 100%;
      display: inline-block;
      padding: 0.5em 0.7em;
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }
`
export default CUSTOM_SELECT
