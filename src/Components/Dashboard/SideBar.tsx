import styled from "styled-components";

const SideBar: React.FC = () => {
  return (
    <StyledSideBar>
      <h1>M</h1>
      <div className="profile">
        <img
          src="https://source.unsplash.com/collection/1718802/450x450"
          alt=""
        />
      </div>
    </StyledSideBar>
  );
};

const StyledSideBar = styled.div`
  width: var(--sideBarWidth);
  height: 100vh;
  padding: 1rem 0.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  background: rgb(16, 16, 16, 0.5);
  h1 {
    font-family: var(--fontHeading);
    font-size: 3rem;

    color: white;
  }

  .profile {
    width: 100%;
    height: calc(5vw - 1rem);
    background: rgba(8, 8, 8, 0.5);
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      border: 1px solid #fff;
    }
  }
`;

export default SideBar;
