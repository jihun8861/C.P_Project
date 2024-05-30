import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import SelectRoom from "../components/SelectRoom";
import axios from "axios";

const Container = styled.div`
  width: 500px;
  height: 300px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

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
      {openModal && <SelectRoom modalClose={closeSelectRoom} />}
      <h1 style={{ paddingBottom: "50px" }}>소켓서버 입장</h1>
      <h2 style={{ paddingBottom: "50px" }}>사용자: {nickname}</h2>
      <StyledButton onClick={openSelectRoom}>입장</StyledButton>
    </Container>
  );
};

const SocketSelect = () => {
  return <Layout props={<SocketSelectContent />} />;
};

export default SocketSelect;
