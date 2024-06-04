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
  border-bottom: 1px solid #eeeeee;
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
  justify-content: space-between;
  span {
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }
`;

const BigBox = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  border-bottom: 1px solid #eeeeee;
`;

const BigBoxL = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  align-items: flex-start;
`;

const BigBoxR = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const ImgFrame = styled.input`
  width: 300px;
  height: 300px;
  border: 1px solid #b2b2b2;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  background-image: url('./images/regist.png');
  background-size: 100% 100%;
`;

const StyledInput = styled.textarea`
  width: 90%;
  height: 60%;
  font-size: 18px;
  display: flex;
  align-items: center;
  border: solid 1px #b2b2b2;
  &:hover {
    border: solid 1px #191919;
  }
  &:focus-within {
    outline: none;
    border: solid 1px #191919;
  }
  padding: 17px 0 0 10px;
  resize:none;
  overflow-y: hidden;
  &::placeholder {
    color: #ababab;
    font-weight: 500;
  }
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
  const [titleLength, setTitleLength] = useState(0);
  const [contextLength, setContextLength] = useState(0);
  const navigate = useNavigate();

  const handleFileChange = async (e) => {
    const selectedFiles = e.target.files;
    setFiles(selectedFiles);
    console.log(selectedFiles);
    await handleUpload(selectedFiles);
  };

  useEffect(() => {
    return async () => {
      removeImage();
    };
  }, []);

  const removeImage = async () => {
    if (localStorage.getItem('isWriting') !== null) {
      const isWriting = localStorage.getItem('isWriting');
      console.log(isWriting);
      if (isWriting) {
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

  const postPrice = (e) => {
    setPrice(e.target.value);
    console.log(e.target.value);
  };

  const postContext = (e) => {
    setContext(e.target.value);
    setContextLength(e.target.value.length);
    console.log(e.target.value);
  };

  const postTitle = (e) => {
    setTitle(e.target.value);
    setTitleLength(e.target.value.length);
    console.log(e.target.value);
  }

  return (
    <Container>
      <SmallBox style={{ borderBottom: "solid 1px #191919" }}>
        <h1>기본정보</h1>
        <h3 style={{ color: "red", marginLeft: "3%" }}>*필수입력항목</h3>
      </SmallBox>
      <BigBox>
        <BigBoxL>
          <h2 style={{ marginTop: "20%" }}>상품이미지(12)</h2>
        </BigBoxL>

        <BigBoxR>
          <ImgFrame imgUrl={imgUrl} type="file" onChange={handleFileChange} multiple />
        </BigBoxR>
      </BigBox>

      <SmallBox>
        <SmallBoxL>
          <h2>상품명</h2>
        </SmallBoxL>

        <SmallBoxR>
          <StyledInput placeholder="상품명을 입력해주세요." onChange={postTitle} maxLength={30} />
          <span>{titleLength}/30</span>
        </SmallBoxR>
      </SmallBox>

      <BigBox style={{height:"300px"}}>
        <BigBoxL style={{ paddingTop: "30px" }}>
          <h2>설명</h2>
        </BigBoxL>

        <BigBoxR style={{flexDirection:"column",justifyContent:"center"}}>
          <StyledInput 
              style={{width: "100%",height:"60%",padding:"20px"}}
              placeholder="브랜드, 모델명, 구매 시기, 하자 유무 등 상품 설명을 최대한 자세히 적어주세요.
전화번호, SNS 계정 등 개인정보 입력은 제한될 수 있어요.
안전하고 건전한 거래 환경을 위해 과학기술정보통신부, 한국인터넷증흥원과 Be Bid(주)가 함께합니다."
              
              onChange={postContext} 
              maxLength={200}/>
              <div style={{display:"flex", width:"100%",justifyContent:"flex-end",paddingTop:"10px",fontSize:"18px"}}>{contextLength}/200</div>
        </BigBoxR>
      </BigBox>

      <SmallBox>
        <SmallBoxL>
          <h2>가격 설정</h2>
        </SmallBoxL>

        <SmallBoxR style={{width:"35%"}}>
          <StyledInput type="number" placeholder="가격을 입력해주세요." onChange={postPrice}/>          
          <span>원</span>
        </SmallBoxR>
      </SmallBox>

      <StyleButton onClick={writing}>제출하기</StyleButton>
    </Container>
  );
};

const Auction = () => {
  return <Layout props={<AuctionContent />} />
};

export default Auction;