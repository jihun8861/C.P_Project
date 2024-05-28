import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 220px;
  height: 350px;
  margin-right: 25px; /* 기본 margin-right 값 */
  cursor: pointer;
  &:nth-child(5n) {
    margin-right: 0; /* 5번째 아이템마다 margin-right을 0으로 설정 */
  }
`;

const SkeletonAnimation = keyframes`
0% {
  background-position: -200% 0;
}
100% {
  background-position: 200% 0;
}
`;

const ImageFrame = styled.div`
  width: 100%;
  height: 230px;
  background: linear-gradient(90deg, #f0f0f0, #f5f5f5, #f0f0f0);
  background-size: 200% 100%;
  animation: ${SkeletonAnimation} 1.5s infinite;
`;

const TextFrame = styled.div`
  width: 100%;
  height: 45px;
  background: linear-gradient(90deg, #f0f0f0, #f5f5f5, #f0f0f0);
  background-size: 200% 100%;
  animation: ${SkeletonAnimation} 1.5s infinite;
  &:last-child {
    height: 50px; /* 마지막 TextFrame의 높이를 조금 더 높임 */
  }
`;

const SkeletonItemFrame = () => {
  const navigate = useNavigate();

  const handleDetailPost = () => {
    // 로딩 중에는 클릭되지 않도록 설정
    return;
  };

  return (
    <Container onClick={handleDetailPost}>
      <ImageFrame />
      <TextFrame />
      <TextFrame style={{ borderBottom: "none" }} />
    </Container>
  );
};

export default SkeletonItemFrame;
