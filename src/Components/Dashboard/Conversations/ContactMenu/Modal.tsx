import styled from "styled-components"
import DeleteModal from "./DeleteModal"
import RenameModal from "./RenameModal"

const Modal: React.FC<{
  menuConfig: {
    positionY: number
    openState: boolean
    contact: {
      contactId: string
      contactName: string
    } | null
  }
  modalState: {
    active: boolean
    type: "rename" | "delete" | null
  }
  setModalState: React.Dispatch<
    React.SetStateAction<{
      active: boolean
      type: "rename" | "delete" | null
    }>
  >
}> = ({ menuConfig, modalState, setModalState }) => {
  const cancel = () => {
    setModalState({ active: false, type: null })
  }

  return (
    <StyledParentModal>
      {modalState.type === "rename" ? (
        <RenameModal menuConfig={menuConfig} cancel={cancel} />
      ) : (
        <DeleteModal menuConfig={menuConfig} cancel={cancel} />
      )}
    </StyledParentModal>
  )
}

const StyledParentModal = styled.div`
  position: fixed;
  z-index: 10;
  inset: 0;
  display: grid;
  place-items: center;
`

export default Modal
