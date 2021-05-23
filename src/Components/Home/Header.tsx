import styled from "styled-components";

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <h1>Messenger</h1>
      <button>Sign Up</button>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  width: 100vw;
  height: var(--navHeight);
  padding: 0 var(--padding);

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-family: var(--fontHeading);

  position: relative;
  z-index: 10;
  h1 {
    font-size: 2.5em;
    font-weight: 700;
    color: #fff;
  }

  button {
    padding: 0.42rem 1.1rem;
    background: var(--primary);

    font-size: 1.25em;
    font-weight: 700;
    color: #fff;

    border-radius: 7px;
  }
`;

export default Header;
