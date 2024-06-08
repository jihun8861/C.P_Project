import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import SelectRoom from "../components/SelectRoom";
import axios from "axios";

const Container = styled.div`
  width: 100vw;
  height: 1000px;
  background-image: url('./images/support.jpg');
  background-size: 100% 100%;
  opacity: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Frame = styled.div`
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`

const StyledInput = styled.input`
  width: 300px;
  height: 50px;
  margin-top: 20px;
  border: none;
  border-bottom: 1px solid black;
`;

const StyledButton = styled.button`
  width: 300px;
  height: 50px;
  margin-top: 20px;
  background-color: salmon;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
`;

const LobbySelect = styled.div`
  width: 130px;
  height: 150px;
  background-color: #120b0a;
  opacity: 10%;
`;

const SocketSelectContent = () => {
  const [openModal, setOpenModal] = useState(false);
  const [nickname, setNickname] = useState();
  const token = localStorage.getItem('token');
  
  const openSelectRoom = () => {
    setOpenModal(true);
  };

  const closeSelectRoom = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://port-0-cpbeck-hdoly2altu7slne.sel5.cloudtype.app/api/users/my_page', {
          "data": {
            "authorization": token
          }
        });
        console.log(response.data.nick_name);
        setNickname(response.data.nick_name);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Frame>
        {openModal && <SelectRoom modalClose={closeSelectRoom} />}
        <h1 style={{ paddingBottom: "50px" }}>무엇을 도와드릴까요?</h1>
        <h4 style={{ paddingBottom: "50px" }}>고객님의 불편사항이나 궁금증을 해결해 드리겠습니다.</h4>
        <h2 style={{ paddingBottom: "50px" }}>사용자: {nickname}</h2>
        <div><LobbySelect/></div>
        <StyledButton onClick={openSelectRoom}>입장</StyledButton>
      </Frame>
    </Container>
  );
};

const SocketSelect = () => {
  return <Layout props={<SocketSelectContent />} />;
};

export default SocketSelect;
