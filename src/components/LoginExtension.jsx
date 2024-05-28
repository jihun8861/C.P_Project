import React, { useState } from 'react';
import styled from "styled-components";

const Container = styled.div`
  width: 500px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid lightgray;
  background-color: lightgray;
  position: fixed;
  bottom: 350px;
  z-index: 10;
`;

const ButtonArea = styled.div`
  width: 60%;
  height: 50px;
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: space-around;
`

const StyledButton = styled.button`
  width: 100px;
  height: 50px;
  background-color: salmon;
  border-radius: 20px;
  font-size: 20px;
  cursor: pointer;
`;

const LoginExtension = ({ onExtend, onLogout }) => {
  return (
    <Container>
      <h1>로그인 시간이 초과되었습니다.</h1>
      <h1>연장하시겠습니까?</h1>
      <ButtonArea>
        <StyledButton onClick={onExtend}>연장하기</StyledButton>
        <StyledButton onClick={onLogout}>로그아웃</StyledButton>
      </ButtonArea>
    </Container>
  );
};

export default LoginExtension;
