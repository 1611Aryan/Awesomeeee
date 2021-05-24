import { useState } from "react";
import styled from "styled-components";
import Chat from "./Chat";
import Conversations from "./Conversations";
import SideBar from "./SideBar";

const Dashboard: React.FC = () => {
  const [selected, setSelected] = useState({
    name: "Aryan",
    img: "https://source.unsplash.com/collection/4457310/250x250/?sig=10",
  });

  return (
    <StyledDashboard>
      <SideBar />
      <Conversations setSelected={setSelected} />
      <Chat selected={selected} />
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

  --sideBarWidth: 5vw;
  --conversationsWidth: 23vw;
  --chatWidth: calc(100vw - var(--sideBarWidth) - var(--conversationsWidth));

  --topPadding: 2em;
  --headingSize: 2em;
  --searchBarMarginT: 1.25em;
`;

export default Dashboard;
