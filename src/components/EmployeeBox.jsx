import React from "react";
import styled from "styled-components";

const ItemBoxContainer = styled.div`
  width: 40%;
  height: 350px;
  position: relative;
  border: 1px solid lightgray;
  margin: auto;
  background-color: white;
  border-radius: 20px;
`;

const TopFrame = styled.div`
  width: 100%;
  height: 80px;
  background-color: #808080;
  border-radius: 20px 20px 0px 0px;
`;

const BottomFrame = styled.div`
  width: 100%;
  height: 270px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  img {
    position: absolute; /* 이미지의 절대적 위치 설정 */
    bottom: 60%; /* 상단 위치를 부모 요소의 중앙으로 설정 */
  }

  h3 {
    color: gray;
  }
`;

const TextBox = styled.div`
  width: 100%;
  height: 100px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EmployeeBox = ( {name , text , explain , backColor} ) => {
  return (
    <ItemBoxContainer>
      <TopFrame style={{backgroundColor:{backColor}}}/>
      <BottomFrame>
        <img src="/images/face.png" />
        <TextBox>
          <h1>{name}</h1>
          <h3>{text}</h3>
          <h5>{explain}</h5>
        </TextBox>
      </BottomFrame>
    </ItemBoxContainer>
  );
};

export default EmployeeBox;