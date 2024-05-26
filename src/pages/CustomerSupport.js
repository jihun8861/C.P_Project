import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 50px;
  }

  h3 {
    margin-top: 20px;
  }
`;

const StyledHr = styled.hr`
  width: 50%;
  border: 1px solid gray;
  margin-top: 20px;
`;

const StyleButton = styled.button`
  width: auto;
  height: auto;
  cursor: pointer;
  border-radius: 20px;
  margin-top: 20px;
  font-size: 20px;
`;

const CustomerSupportContent = () => {
  return (
    <Container>
      <h1>채팅상담 신청하기</h1>
      <h3>BEBID 직원이 실시간으로 친절하게 <br/>상담해드립니다!</h3>
      <StyledHr/>
      <StyleButton>상담원 연결</StyleButton>
    </Container>
  );
};

const CustomerSupport = () => {
  return <Layout props={<CustomerSupportContent/>}/>
}

export default CustomerSupport;