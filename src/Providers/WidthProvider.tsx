import React, { useContext, createContext, useState, useEffect } from "react"

type width = number

const WidthContext = createContext<{
  width: width
}>({
  width: window.innerWidth,
})

export const useWidth = () => useContext(WidthContext)

export const WidthProvider: React.FC<{
  children: JSX.Element | JSX.Element[]
}> = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth))
  })

  return (
    <WidthContext.Provider value={{ width }}>{children}</WidthContext.Provider>
  )
}
