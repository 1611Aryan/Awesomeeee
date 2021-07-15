import { useState } from "react"
import CUSTOM_SELECT from "./CUSTOM_SELECT"

const COLOR_PALETTE_FIELD: React.FC = () => {
  const options = [
    "Cosmic Blue",
    "Blazing Sun",
    "Golden Thunder",
    "Triple White",
    "What's Poppin",
  ]

  const [colorPalette, setColorPalette] = useState<string>("Cosmic Blue")

  return (
    <CUSTOM_SELECT
      options={options}
      colorPalette={colorPalette}
      setColorPalette={setColorPalette}
    />
  )
}

export default COLOR_PALETTE_FIELD
