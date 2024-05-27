import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import SelectRoom from "../components/SelectRoom";

const Container = styled.div`
  width: 500px;
  height: 300px;
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  width: 300px;
  height: 50px;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  width: 300px;
  height: 50px;
  margin-top: 20px;
  background-color: salmon;
  border-radius: 10px;
  font-size: 30px;
`;

const SocketSelectContent = () => {
  const [openModal, setOpenModal] = useState(false);

  const openSelectRoom = () => {
    setOpenModal(true);
  };

  return (
    <Container>
      {openModal && <SelectRoom />}
      <h1>소켓서버 입장</h1>
      <StyledInput placeholder="이름을 입력해 주세요" />
      <StyledButton onClick={openSelectRoom}>로그인</StyledButton>
    </Container>
  );
};

const SocketSelect = () => {
  return <Layout props={<SocketSelectContent />} />;
};

export default SocketSelect;