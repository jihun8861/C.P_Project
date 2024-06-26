// MyPageItemBox.js
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 200px;
  height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
  border: solid 1px;
`;

const ImageArea = styled.div`
  width: 100%;
  height: 70%; /* 비율 조정 */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const TextArea = styled.div`
  width: 100%;
  height: 25%;
  font-weight: bold;
  display: flex;
  align-items: flex-start;
  padding-top: 20px;
`;

const PriceArea = styled.div`
  width: 100%;
  height: 25%;
  font-weight: bold;
  display: flex;
  align-items: flex-start;
`;

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const MyPageItemBox = ({ Product, Price, Image }) => {
  return (
    <Container>
      <ImageArea>
        <StyledImage src={Image} alt={Product} />
      </ImageArea>
      <TextArea title={Product}>{Product.length > 13 ? `${Product.slice(0, 13)}...` : Product}</TextArea>
      <PriceArea>{formatPrice(Price)}원</PriceArea>
    </Container>
  );
};

export default MyPageItemBox;
