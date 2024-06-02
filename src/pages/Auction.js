import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import DropdownList from "../components/DropdownList";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 1200px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3%;
`;

const SmallBox = styled.div`
  width: 100%;
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
  width: 100%;
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
  width: 200px;
  height: 50px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 20px;
  margin-top: 20px;
  cursor: pointer;
`;

const AuctionContent = () => {

  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');
  const [price, setPrice] = useState(0);
  const [imgFile, setImgFile] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const navigate = useNavigate();
  
  const handleFileChange = async (e) => {
    const selectedFiles = e.target.files;
    setFiles(selectedFiles);
    console.log(selectedFiles);
    await handleUpload(selectedFiles);
  };

  useEffect(() => {
    return async() => {
      removeImage();
    };
  },[]);

  const removeImage = async() => {
    if(localStorage.getItem('isWriting') !== null)
    { 
      const isWriting = localStorage.getItem('isWriting');
      console.log(isWriting);
      if(isWriting)
      { 
        console.log("사진 삭제 메소드 호출");
        localStorage.removeItem('isWriting');
      }
    }
  }

  const handleUpload = async (selectedFiles) => {
    removeImage();
    const formData = new FormData();
    console.log(formData);
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('in_files', selectedFiles[i]);
    }

    try {
      const response = await axios.post('https://port-0-cpbeck-hdoly2altu7slne.sel5.cloudtype.app/api/upload-images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImgFile(response.data);
      setImgUrl(response.data);
      console.log('File upload success:', response.data);
      localStorage.setItem('isWriting', true)
    } 
    catch (error) {
      console.error('Error uploading files:', error);
      alert('잘못된 접근입니다.')
    }
  };

  const writing = async () => {
    var token = localStorage.getItem('token')
    const response = await axios.post('https://port-0-cpbeck-hdoly2altu7slne.sel5.cloudtype.app/api/writing', {
      data: {
        authorization: token,
        title: title,
        text: context,
        startprice: price,
        picture: imgFile,
      }
    })
    console.log(response.data)
    localStorage.removeItem('isWriting')
    navigate('/');
  };

  const postTitle = (e) => {
    setTitle(e.target.value);
    console.log(e.target.value);
  };

  const postContext = (e) => {
    setContext(e.target.value);
    console.log(e.target.value);
  };

  const postPrice = (e) => {
    setPrice(e.target.value);
    console.log(e.target.value);
  }

  return (
    <Container>
      <SmallBox>
        <h1>기본정보</h1>
        <h3 style={{color:"red" , marginLeft:"3%"}}>*필수입력항목</h3>
      </SmallBox>
      <SmallBox>
        <SmallBoxL>
          <h2>글제목</h2>
        </SmallBoxL>
        <SmallBoxR>
          <StyledInput placeholder="글 제목을 입력하세요" onChange={postTitle}/>
        </SmallBoxR>
      </SmallBox>
      <BigBox>
        <BigBoxL>
          <h2 style={{marginTop:"20%"}}>내용</h2>
        </BigBoxL>
        <BigBoxR>
          <StyledInput style={{height: "80%"}} placeholder="내용을 입력하세요" onChange={postContext}/>
        </BigBoxR>
      </BigBox>
      <BigBox>
        <BigBoxL>
          <h2 style={{marginTop:"20%"}}>상품이미지(12)</h2>
        </BigBoxL>
        <BigBoxR>
          <ImgFrame imgUrl={imgUrl}/>
          <input type="file" onChange={handleFileChange} multiple />
        </BigBoxR>
      </BigBox>
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
          <h2>가격 설정</h2>
        </SmallBoxL>
        <SmallBoxR>
          <StyledInput placeholder="흥정 시작가격을 입력하세요" onChange={postPrice}/>
        </SmallBoxR>
      </SmallBox>
      <StyleButton onClick={writing}>제출하기</StyleButton>
    </Container>
  );
};

const Auction = () => {
  return <Layout props={<AuctionContent />}/>
};

export default Auction;