import { useState } from "react";
import styled from "styled-components";

import SideBar from "./SideBar";
import Conversations from "./Conversations";
import Chat from "./Chat";
import ClosedChat from "./ClosedChat";

const Dashboard: React.FC = () => {
  const [selected, setSelected] =
    useState<{ name: string; img: string } | null>(null);

  return (
    <StyledDashboard>
      <SideBar />
      <Conversations selected={selected} setSelected={setSelected} />
      {selected ? <Chat selected={selected} /> : <ClosedChat />}
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
  --searchBarMarginT: 1.5em;
`;

export default Dashboard;
