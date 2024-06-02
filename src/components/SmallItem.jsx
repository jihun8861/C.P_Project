import React from "react";
import styled from "styled-components";

const SmallFrame = styled.div`
width: 48%;
height: 150px;
display: flex;
align-items: center;
justify-content: space-around;
margin-top: 20px;
border: 1px solid #eeeeee;
`;

  const ImgBox = styled.div`
    width: 20%;
    height: 80%;
    border: 1px solid #eeeeee;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  `;

  const TextBox = styled.div`
  width: 40%;
  height: 80%;
  `;

    const TitleTextArea = styled.div`
      width: 100%;
      height: 40%;
      border-bottom: 1px solid #eeeeee;
    `;

    const ExplanationArea = styled.div`
      width: 100%;
      height: 30%;
    `;

    const PriceArea = styled.div`
      width: 100%;
      height: 30%;
    `;

  const StyledButton = styled.div`
  width: 100%;
  height: 30%;
  border-radius: 5px;
  background-color: lightsalmon;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
  cursor: pointer;
  `;

const SmallItem = ( {picture, title, price_info, view_count} ) => {
  return (
    <SmallFrame>
      <ImgBox>
        {picture}
      </ImgBox>
      <TextBox>
        <TitleTextArea>
          <h3>이상품 어때요? 조회수: {view_count}회 </h3>
        </TitleTextArea>
        <ExplanationArea>
          <h4>{title}</h4>
        </ExplanationArea>
        <PriceArea>
          <span>현재 시작가: {price_info} 원</span>
        </PriceArea>
      </TextBox>
      <ImgBox style={{border:"none"}}>
        <StyledButton>입찰하기</StyledButton>
      </ImgBox>
    </SmallFrame>
  );
};

export default SmallItem;