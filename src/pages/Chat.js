import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Frame = styled.div`
  width: 500px;
  height: 700px;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const TextArea = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
`;

const InputArea = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ccc;
  background-color: white;
  padding: 0 10px;
  box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledInput = styled.input`
  width: 85%;
  height: 100%;
  font-size: 16px;
  padding: 10px;
  outline: none;
  border: none;
  box-sizing: border-box;
`;

const ClickButton = styled.button`
  width: 15%;
  height: 100%;
  border: none;
  border-left: 1px solid #ddd;
  background-color: transparent;
  font-size: 24px;
  cursor: pointer;
`;

const MyTalkArea = styled.div`
  width: 70%;
  max-width: 50%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 20px;
  background-color: #f9f9f9;
  margin: 5px;
  padding: 10px;
  font-size: 16px;
`;

const YourTalkArea = styled.div`
  width: 70%;
  max-width: 50%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 20px;
  background-color: lightyellow;
  margin: 5px;
  padding: 10px;
  font-size: 16px;
  align-self: flex-end; /* 오른쪽 정렬 */
`;

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // 보낸/받은 메시지 배열
  const [id, setID] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://port-0-cpbeck-hdoly2altu7slne.sel5.cloudtype.app/api/users/my_page', {
          "data": {
            "authorization": token
          }
        });
        console.log(response.data);
        setID(response.data.name);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

 useEffect(() => {
    const ws = new WebSocket('wss://port-0-cpbeck-hdoly2altu7slne.sel5.cloudtype.app/api/ws');
    
    ws.onopen = () => {
      console.log('Connected to the WebSocket server');
      const payload = {
        data: {
          username: id,
          groupname: "자유토론방", 
        }
      }
      ws.send(JSON.stringify(payload)); // 사용자 정보를 서버에 전송
    };
    
    ws.onmessage = (event) => {
      setMessages(prevMessages => [...prevMessages, { text: event.data, isMine: false }]);
    };

    ws.onclose = () => {
      console.log('Disconnected from the WebSocket server');
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
}, [id]); // id가 변경될 때마다 useEffect 재실행

  const sendMessage = () => {
    if (socket && message.trim() !== '') {
      socket.send(message);
      setMessages(prevMessages => [...prevMessages, { text: message, isMine: true }]); // 내가 보낸 메시지 배열에 추가
      setMessage('');
    }
  };

  return (
    <Container>
      <Frame>
        <TextArea>
          {messages.map((msg, index) => (
            msg.isMine ? <MyTalkArea key={index}>{msg.text}</MyTalkArea> : <YourTalkArea key={index}>{msg.text}</YourTalkArea>
          ))}
        </TextArea>
        <InputArea>
          <StyledInput
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메세지를 입력하세요"
          />
          <ClickButton onClick={sendMessage}>전송</ClickButton>
        </InputArea>
      </Frame>
    </Container>
  );
};

export default Chat;
