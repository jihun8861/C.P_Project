import React from "react";
import styled from "styled-components";
import { Link,useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 220px;
  height: 350px;
  border: 2px solid lightgray;
  background-color: #FAFAFA;
  img {
    width: 100%;
    height: 100%;
  }
  cursor: pointer;
`;

const ImageFrame = styled.div`
  width: 100%;
  height: 200px;
  border-bottom: 2px solid lightgray;
`;

const TextFrame = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  font-weight: bold;
`;

const ItemFrame = ( {Product, Price, Image,Array} ) => {
  const navigate = useNavigate();
  const handleDetailPost = () => {
    console.log(Array)
    navigate('/Bid', {
      state: {
        data: Array
      },
    });
  };
  const truncatedProduct = Product.length > 11 ? Product.substring(0, 8) + "..." : Product;
  const formattedPrice = Price.toLocaleString();
  console.log(Array)
  return (
    <Container>
      <ImageFrame
        onClick={() =>handleDetailPost(Array)}
      >
        {console.log(Image)}
        <img src={Image} alt={"로딩중"} />
      
      </ImageFrame>
      <TextFrame style={{marginTop:"12%"}}>
        {truncatedProduct}
      </TextFrame>
      <TextFrame>
        시작가: {formattedPrice} 원
      </TextFrame>
    </Container>
  )
}

export default ItemFrame;