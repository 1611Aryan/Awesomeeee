import styled from "styled-components";
import Message from "./Message";

const Messages: React.FC = () => {
  const messages: {
    message: string;
    sender: "me" | "contact";
  }[] = [
    {
      message:
        "Aliquam sit amet purus faucibus, lobortis neque nec, cursus nulla. Integer dignissim diam quis erat commodo semper. Nulla congue aliquet nisi sed iaculis. Fusce ullamcorper magna sit amet commodo pharetra. Ut sem massa, dictum in augue vitae, fringilla imperdiet felis. Interdum et malesuada fames ac.. ",
      sender: "contact",
    },
    {
      message:
        "Cras vitae vehicula elit. Phasellus rutrum ultrices diam in porta. In rutrum mollis nisi. Maecenas sodales arcu vulputate condimentum interdum. Praesent mollis posuere aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus lectus dolor, posuere ac purus quis, vehicula.",
      sender: "me",
    },
    {
      message:
        "Duis commodo ipsum mi, nec interdum quam placerat id. Nullam luctus cursus nunc at lacinia. Vivamus diam erat, lacinia vel enim eu, bibendum ullamcorper libero. Quisque faucibus non augue at auctor. Duis id mi quis lacus pharetra posuere luctus et libero. Morbi id urna non.",
      sender: "contact",
    },
    {
      message:
        "Donec in massa et quam volutpat tempor. Vivamus vel ligula lacinia, pellentesque erat nec, fringilla sem. Etiam et dolor et nunc blandit pellentesque.",
      sender: "me",
    },
  ];

  return (
    <StyledMessages>
      <ul>
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
      </ul>
    </StyledMessages>
  );
};

const StyledMessages = styled.div`
  width: 100%;
  height: var(--MessagesHeight);

  ul {
    list-style-type: none;

    width: 100%;
    height: 100%;
    overflow: hidden auto;

    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  }
`;

export default Messages;
