import React from "react";
import styled from "styled-components";

const Container = styled.footer`
  width: 100%;
  height: 25vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #262626;
  z-index: 20;
  color: gray;
  border: 1px solid black;
`;

const Footer = () => {
  return (
      <Container>
        <h1>BE BID</h1>
        <ul style={{marginTop:"30px"}}>대표 박준수  경남 김해시 인제로 197 P&N 동아리방 TEL. 010-7580-7117</ul>
      </Container>
  )
}

export default Footer;
