import React from "react";
import style from "styled-components"
import Chatbot from "react-chatbot-kit"
import config from "./configs/config.js";
import MessageParser from "./configs/MessageParser.js";
import ActionProvider from "./configs/ActionProvider.js";
import 'react-chatbot-kit/build/main.css'
import './configs/ChatBot.css';
import Layout from "../components/Layout";

const Container = style.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const ChatBotContent = () => {
  return (
    <Container>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        headerText='P&N 챗봇'
        placeholderText='채탕을 입력하세용'
      />
    </Container>
  );
}

const ChatBot = () => {
  return <Layout props={<ChatBotContent />} />;
}

export default ChatBot;