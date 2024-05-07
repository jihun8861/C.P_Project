import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 25vh;
  margin-top: 5%;
  background-color: #262626;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Frame = styled.div`
  width: 1400px;
  height: 25vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #262626;
  color: gray;
`;

const Footer = () => {
  return (
    <Container>
      <Frame>
        <h1>BE BID</h1>
        <ul style={{marginTop:"30px"}}>대표 박준수  경남 김해시 인제로 197 P&N 동아리방 TEL. 010-7580-7117</ul>
      </Frame>
    </Container>
  )
}

export default  Footer;