// LoginExtension.js

import React, { useEffect, useState } from 'react';
import styled from "styled-components";

const Container = styled.div`
  width: 480px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: fixed;
  bottom: 350px;
  z-index: 12;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 -4px 8px rgba(0, 0, 0, 0.1), 4px 0 8px rgba(0, 0, 0, 0.1), -4px 0 8px rgba(0, 0, 0, 0.1);
`;

const Frame = styled.div`
  width: 95%;
  height: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextArea = styled.div`
  width: 80%;
  height: 20%;
  display: flex;
  align-items: center;
  h2 {
    font-weight: 100;
  }
  border-bottom: 1px solid lightgray;
`;

const TimerArea = styled.div`
  width: 80%;
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonArea = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: space-around;
`;

const StyledButtonLeft = styled.button`
  width: 180px;
  height: 40px;
  background-color: white;
  border-radius: 5px;
  font-size: 20px;
  cursor: pointer;
  border: 2px solid salmon;
  transition: all 0.3s ease;

  &:hover {
    width: 200px;
    height: 50px;
    background-color: salmon;
    color: white;
  }
`;

const StyledButtonRight = styled.button`
  width: 180px;
  height: 40px;
  background-color: salmon;
  border-radius: 5px;
  font-size: 20px;
  cursor: pointer;
  border: 2px solid salmon;
  transition: all 0.3s ease;
  color: white;

  &:hover {
    width: 200px;
    height: 50px;
    background-color: white;
    color: black;
  }
`;

const LoginExtension = ({ onExtend, onLogout }) => {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTimeLeft => {
        if (prevTimeLeft <= 1) {
          clearInterval(interval);
          onLogout();
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 타이머 정리
  }, [onLogout]);

  return (
    <Container>
      <Frame>
        <TextArea>
          <h3>자동 로그아웃 안내</h3>
        </TextArea>
        <TimerArea style={{height:"50%"}}>
          <h4>로그아웃까지 남은 시간</h4>
          <h1>{timeLeft}</h1>
          <h5>장시간 활동이 없어 자동으로 로그아웃 됩니다.</h5>
          <h5>계속 이용 하시려면 로그인 시간을 연장해주세요.</h5>
        </TimerArea>
        <ButtonArea>
          <StyledButtonLeft onClick={onExtend}>연장하기</StyledButtonLeft>
          <StyledButtonRight onClick={onLogout}>로그아웃</StyledButtonRight>
        </ButtonArea>
      </Frame>
    </Container>
  );
};

export default LoginExtension;