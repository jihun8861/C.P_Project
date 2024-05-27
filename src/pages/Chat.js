import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Frame = styled.div`
  width: 500px;
  height: 600px;
  border: 1px solid black;
  background-color: lightblue;
`;

const TextArea = styled.div`
  widht: 100%;
  height: 90%;
`;

const InputArea = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid black;
`;

const StyledInput = styled.input`
  width: 90%;
  height: 100%;
  border: none;
`;

const StyledButton = styled.button`
  width: 10%;
  height: 100%;
  border: none;
  cursor: pointer;
`;

const ChatContent = () => {
  return (
    <Container>
      <Frame>
        <TextArea/>
        <InputArea>
          <StyledInput/>
          <StyledButton>입력</StyledButton>
        </InputArea>
      </Frame>
    </Container>
  )
}

const Chat = () => {
  return <Layout props={<ChatContent/>} />
}

export default Chat;