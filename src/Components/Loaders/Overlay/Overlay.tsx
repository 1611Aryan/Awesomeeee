import styled from "@emotion/styled"

const Overlay = () => <StyledOverlay></StyledOverlay>

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: rgba(58, 58, 58, 0.2);
  backdrop-filter: blur(1px);
`

export default Overlay
