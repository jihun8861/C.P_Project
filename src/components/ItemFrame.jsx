import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 220px;
  height: 350px;
  border: 1px solid lightgray;
  background-color: #FAFAFA;
  img {
    width: 100%;
    height: 100%;
  }
`;

const ImageFrame = styled.div`
  width: 100%;
  height: 200px;
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

const ItemFrame = ( {Product, Price, Image} ) => {

  return (
    <Container>
      <ImageFrame>
        <img src={Image} />
      </ImageFrame>
      <TextFrame style={{marginTop:"12%"}}>
        {Product}
      </TextFrame>
      <TextFrame>
        경매 시작가: {Price}
      </TextFrame>
      <TextFrame>
        
      </TextFrame>
    </Container>
  )
}

export default ItemFrame;