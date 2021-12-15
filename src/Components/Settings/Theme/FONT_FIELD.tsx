import { useState } from "react"
import CUSTOM_SELECT from "./CUSTOM_SELECT"

const FONT_FIELD: React.FC = () => {
  const options = ["Modern", "Caligraphy", "Cartoon", "Monocle", "Random"]

  const [font, setFont] = useState<string>(() => options[0])

  return (
    <CUSTOM_SELECT
      label={"Font"}
      options={options}
      colorPalette={font}
      setColorPalette={setFont}
    />
  )
}

export default FONT_FIELD
