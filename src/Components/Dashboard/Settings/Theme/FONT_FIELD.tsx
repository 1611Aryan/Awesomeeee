import { useState } from "react"
import CUSTOM_SELECT from "./CUSTOM_SELECT"

const FONT_FIELD: React.FC = () => {
  const options = [
    "Cosmic Blue",
    "Blazing Sun",
    "Golden Thunder",
    "Triple White",
    "What's Poppin",
  ]

  const [font, setFont] = useState<string>("Cosmic Blue")

  return (
    <CUSTOM_SELECT
      options={options}
      colorPalette={font}
      setColorPalette={setFont}
    />
  )
}

export default FONT_FIELD
