import React from "react";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";

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
  width: 70%;
  height: 80%;
  `;

    const TitleTextArea = styled.div`
      width: 100%;
      height: 40%;
      border-bottom: 1px solid #eeeeee;
      display: flex;
      justify-content: space-between;
      h3{
        color: #abacab;
      }
      h2{
        font-size: 20px;
      }
    `;

    const ExplanationArea = styled.div`
      width: 100%;
      height: 30%;
    `;

    const PriceArea = styled.div`
      width: 100%;
      height: 30%;
      display: flex;
      justify-content: space-between;
      span{
        display: flex;
        justify-content: center;
        align-items: center;
      }
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

const SmallItem = ( {picture, title, price_info, view_count, userid} ) => {
  const truncatedProduct = title.length > 25 ? title.substring(0, 25) + "..." : title;
  const priceNumber = parseInt(price_info, 10); // 문자열을 정수형으로 변환
  const formattedPrice = priceNumber.toLocaleString();

  return (
    <SmallFrame>
      <ImgBox>
        {picture}
      </ImgBox>
      <TextBox>
        <TitleTextArea>
          <h2>이상품 어때요?</h2>
          <h3>{view_count}회</h3>
        </TitleTextArea>
        <ExplanationArea>
          <h4>{truncatedProduct}</h4>
        </ExplanationArea>
        <PriceArea>
          <span>현재가: {formattedPrice} 원</span>
          <span><FaUser style={{width: "70%",height:"70%",padding: "5px 5px 0 0"}}/>{userid}</span>
        </PriceArea>
      </TextBox>
     
    </SmallFrame>
  );
};

export default SmallItem;