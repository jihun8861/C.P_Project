import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Layout from "../components/Layout";
import EmployeeBox from "../components/EmployeeBox";

const shine = keyframes`
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
`;

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  opacity: 0;
  flex-direction: column;
  align-items: center;
  animation: ${shine} 5s forwards;
  animation-delay: 1s;
`;

const SmallBox = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  border-bottom: 1px solid lightgray;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 50px;
  }
`;

const LargeBox = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  span {
    font-size: 50px;
    font-weight: bold;
  }
`;

const EmployeeInfoContent = () => {

  return (
  <>
    <LargeBox className="Title">
      <span style={{textDecoration:"underLine"}}>Our Team Info</span>
    </LargeBox>
      <Container>
        <SmallBox>
          <h1>FrontEnd</h1>
        </SmallBox>
        <LargeBox>
          <EmployeeBox 
            backColor="blue"
            name="이승훈" 
            text="프론트엔드 개발자 이승훈 입니다."
            explain="레이아웃 제작 및 홈, 경매페이지 제작을 담당했습니다."
          />
          <EmployeeBox 
            name="현지훈" 
            text="프론트엔드 개발자 현지훈 입니다."
            explain="로그인 / 회원가입 페이지 및 마이페이지를 제작하였습니다."
          />
        </LargeBox>
        <SmallBox style={{marginTop: "50px"}}>
          <h1>BackEnd</h1>
        </SmallBox>
        <LargeBox>
          <EmployeeBox 
            name="박준수"
            text="백엔드 개발자 박준수 입니다."
            explain="팀장을 맡고있습니다. 각종 백엔드 로직을 당당하였으며 프로젝트 총괄을 맡았습니다."
          />
          <EmployeeBox 
            name="김호연"
            text="풀스택 개발자 김호연 입니다."
            explain="백엔드 로직 구현을 담당하였습니다."
          />
        </LargeBox>
        <LargeBox style={{ borderTop: "0px" }}>
        <EmployeeBox 
            name="송준섭"
            text="백엔드 개발자 송준섭 입니다."
            explain="백엔드 로직 구현을 담당하였습니다."
          />
          <EmployeeBox 
            name="조우주"
            text="백엔드 개발자 조우주 입니다."
            explain="백엔드 로직 구현을 담당하였습니다."
          />
        </LargeBox>
      </Container>
    </>
  )
}

const EmployeeInfo = () => {
  return (
    <Layout props={<EmployeeInfoContent />} />
  )
};

export default EmployeeInfo;
