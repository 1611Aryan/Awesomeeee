import { IoMdSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import styled from "styled-components";
import { useAccess } from "../../../Providers/AccessProvider";

const Options: React.FC = () => {
  const { setAccess } = useAccess();

  const logout = () => {
    setAccess(false);
  };

  return (
    <StyledOptions className="options">
      <IoMdSettings />
      <FiLogOut onClick={logout} />
    </StyledOptions>
  );
};

const StyledOptions = styled.div`
  width: 100%;
  flex: 1;

  transform: translateY(100%) scaleY(2);
  opacity: 0;
  pointer-events: none;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  transition: transform ease-in-out 0.2s;
  svg {
    color: #000000;
    font-size: 1.5em;
    cursor: pointer;

    transform: scaleY(0.5);
  }
`;

export default Options;
