import { useEffect, useState, useRef } from "react"
import styled from "@emotion/styled"

import Modal from "./Modal"

const ContactMenu: React.FC<{
  menuConfig: {
    positionY: number
    openState: boolean
    contact: {
      contactId: string
      contactName: string
      roomId: string
    } | null
  }
  setMenuConfig: React.Dispatch<
    React.SetStateAction<{
      positionY: number
      openState: boolean
      contact: {
        contactId: string
        contactName: string
        roomId: string
      } | null
    }>
  >
}> = ({ menuConfig, setMenuConfig }) => {
  const menuRef = useRef<HTMLUListElement>(null)

  const [modalState, setModalState] = useState<{
    active: boolean
    type: "rename" | "delete" | null
  }>({
    active: false,
    type: null,
  })

  useEffect(() => {
    setTimeout(() => {
      menuRef.current && menuConfig.openState && menuRef.current.focus()
    })
  }, [menuConfig])

  //Handlers

  const closeMenu = () => {
    setMenuConfig(menuConfig => ({ ...menuConfig, openState: false }))
    menuRef.current && menuRef.current.blur()
  }

  const clickHandler = (type: "rename" | "delete") => {
    setModalState({ active: true, type })
    closeMenu()
  }

  return (
    <>
      <StyledMenu
        ref={menuRef}
        theme={{ positionY: menuConfig.positionY }}
        onBlur={closeMenu}
        tabIndex={-1}
      >
        <li onClick={() => clickHandler("rename")}>Rename</li>
        <li onClick={() => clickHandler("delete")}>Delete</li>
      </StyledMenu>
      {modalState.active && (
        <Modal
          modalState={modalState}
          setModalState={setModalState}
          menuConfig={menuConfig}
        />
      )}
    </>
  )
}

const StyledMenu = styled.ul<{ theme: { positionY: number } }>`
  opacity: 0;
  border: 0;
  height: 1px;
  width: 1px;

  z-index: 2;

  transition: opacity ease-in-out 0.1s;
  &:focus {
    opacity: 1;
    margin: 0;

    height: 10vh;
    min-width: 10vw;
  }

  position: absolute;
  top: ${props => props.theme.positionY}px;
  right: calc(var(--contactPadding) + var(--conversationsWidth) / 38.46);

  transform: translate(100%);

  border-radius: 4px;
  overflow: hidden;

  list-style-type: none;

  background: rgba(23, 34, 41, 0.9);
  backdrop-filter: blur(1px);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

  font-family: var(--fontContent);

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;

  li {
    flex: 1;
    padding: clamp(0.5em, 1vw, 0.75em) clamp(0.45em, 1vw, 0.65em);
    position: relative;
    width: 100%;
    height: 100%;
    color: #fffc;
    font-size: clamp(0.9em, 2vw, 1em);
    font-weight: 300;
    letter-spacing: 0.5px;

    cursor: pointer;

    @media (hover: hover) {
      transition: background 0.1s;
      &:hover {
        background: rgba(21, 25, 38, 0.7);
      }
    }
  }

  li + li {
    &::after {
      content: "";
      position: absolute;
      top: -1px;
      left: 0.325em;
      height: 1px;
      width: calc(100% - 0.325em * 2);
      background: linear-gradient(to bottom, #fffa, transparent);
    }
  }

  @media only screen and (max-width: 500px) {
    width: 30vw;

    right: calc(40vw);
  }
`

export default ContactMenu
