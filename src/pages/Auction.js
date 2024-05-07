import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import DropdownList from "../components/DropdownList";
import axios from "axios";

const Container = styled.div`
  width: 1300px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3%;
`;

const SmallBox = styled.div`
  width: 1300px;
  height: 100px;  
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
`;

const SmallBoxL = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const SmallBoxR = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const BigBox = styled.div`
  width: 1300px;
  height: 400px;
  display: flex;
  border-bottom: 1px solid lightgray;
`;

const BigBoxL = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  border-bottom: 1px solid lightgray;
  align-items: flex-start;
`;

const BigBoxR = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid lightgray;
  align-items: center;
  justify-content: flex-start;
`;

const ImgFrame = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid black;
  background-size: cover;
  background-position: center;
`;

const StyledInput = styled.input`
  width: 80%;
  height: 40%;
  font-size: 20px;
  padding-left: 3%;
`;

const StyleButton = styled.button`
  width: 400px;
  height: 100px;
`;

const AuctionContent = () => {

  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  
  const fileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = function (event) {
      setImage(event.target.result);
      setSelectedFile(file);
    };
  
    reader.readAsDataURL(file);
  };

  const sendImage = async () => {
    const response = await axios.post('https://port-0-cpbeck-hdoly2altu7slne.sel5.cloudtype.app'+'/api/writing', {
      "data": {
        "userid": "string",
        "title": "string",
        "text": "string",
        "startprice": 0,
        "picture": "string"
      }
    })
  };

  return (
    <Container>
      <SmallBox>
        <h1>기본정보</h1>
        <h3 style={{color:"red" , marginLeft:"3%"}}>*필수입력항목</h3>
      </SmallBox>
      <BigBox>
        <BigBoxL>
          <h2 style={{marginTop:"20%"}}>상품이미지(12)</h2>
        </BigBoxL>
        <BigBoxR>
          <ImgFrame style={{ backgroundImage: `url(${image})` }}/>
          <input type="file" accept="image/*" onChange={fileUpload} />
        </BigBoxR>
      </BigBox>
      <SmallBox>
        <SmallBoxL>
          <h2>상품명</h2>
        </SmallBoxL>
        <SmallBoxR>
          <StyledInput placeholder="상품명을 입력해주세요"/>
        </SmallBoxR>
      </SmallBox>
      <BigBox>
        <BigBoxL>
         <h2 style={{marginTop:"20%"}}>카테고리</h2>
        </BigBoxL>
        <BigBoxR>
          <DropdownList />
        </BigBoxR>
      </BigBox>
      <SmallBox>
        <SmallBoxL>
          <h2>가격</h2>
        </SmallBoxL>
        <SmallBoxR>
          <StyledInput placeholder="흥정 시작가격을 입력하세요"/>
        </SmallBoxR>
      </SmallBox>
      <StyleButton onClick={sendImage}>제출하기</StyleButton>
    </Container>
  );
};

const Auction = () => {
  return <Layout props={<AuctionContent />}/>
};

export default Auction;
