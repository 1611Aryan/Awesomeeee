import styled from "styled-components";
import Conversations from "./Conversations";
import SideBar from "./SideBar";

const Dashboard: React.FC = () => {
  return (
    <StyledDashboard>
      <SideBar />
      <Conversations />
    </StyledDashboard>
  );
};

const StyledDashboard = styled.main`
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  background: linear-gradient(to top, #2b5876, #4e4376);
`;

export default Dashboard;
