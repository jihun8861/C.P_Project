import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SmallItem from "../components/SmallItem";
import axios from "axios";

const Container = styled.div`
  width: 1200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LargeFrame = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 20px;
  border: 1px solid #eeeeee;
`;

const ImgBox = styled.div`
  width: 20%;
  height: 88%;
  display: flex;
  align-items: flex-end;
  justify-content : center;
  border: 1px solid #eeeeee;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const TextBox = styled.div`
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const TitleTextArea = styled.div`
  width: 100%;
  height: 40%;
  border-bottom: 1px solid #eeeeee;
  display: flex;
`;

const ExplanationArea = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
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

const LargeItem = ({ startprice, title, picture }) => {
  return (
    <LargeFrame>
      <ImgBox>
        {picture}
      </ImgBox>
      <TextBox>
        <TitleTextArea>
          <h1 style={{ whiteSpace: "pre-wrap" }}>TODAY </h1><h1>PICK</h1>
        </TitleTextArea>
        <ExplanationArea>
          <h3>요즘 제일 핫해! {title}</h3>
        </ExplanationArea>
        <PriceArea>
          <h2>현재 시작가: {startprice}원</h2>
        </PriceArea>
      </TextBox>
      <ImgBox style={{ border: "none" }}>
        <StyledButton>핫딜상품 입찰하기</StyledButton>
      </ImgBox>
    </LargeFrame>
  );
};

const SmallFrameArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const HotdealContent = () => {
  const [LargeDataTitle, setLargeDataTitle] = useState();
  const [LargeDataPrice, setLargeData] = useState();
  const [LargeDataPicture, setLargeDataPicture] = useState();
  const [Data, setData] = useState([]);
  const [imgArray, setImageArray] = useState([]);
  const [gdArray, setGdArray] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const API_KEY = 'AIzaSyAxAqJYZSKbF7pm5XHril-dndv4HdVrbz4';
  const DRIVE_FOLDER_ID = '1-1w_h8t3ICtJRC57iUuTG-Mwy5sUFXJQ';

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const newGdArray = [];
        for (let i = 0; i < imgArray.length; i++) {
          const response = await axios.get(`https://www.googleapis.com/drive/v3/files?q=name='${imgArray[i]}' and '${DRIVE_FOLDER_ID}' in parents&fields=files(id,name,thumbnailLink)`, {
            params: {
              key: API_KEY,
              pageSize: 1
            }
          });
          newGdArray.push(response.data.files[0].thumbnailLink); // thumbnailLink 저장
          console.log(response.data.files[0].thumbnailLink);
        }
        setGdArray(newGdArray);
        setImagesLoaded(true); // 이미지 로드 상태를 true로 설정
      } catch (error) {
        console.log('gderror', error);
      }
    };

    if (imgArray.length > 0) {
      fetchImages();
    }
  }, [imgArray]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://port-0-cpbeck-hdoly2altu7slne.sel5.cloudtype.app/api/users/hotdeals_contents');
        console.log(response.data);
        setData(response.data);
        setLargeData(response.data[0].startprice);
        setLargeDataTitle(response.data[0].title);
        setLargeDataPicture(response.data[0].picture); // 첫 번째 항목의 이미지를 LargeDataPicture에 설정
        const newImgArray = response.data.slice(0, 7).map(item => item.picture);
        setImageArray(newImgArray);
        setDataLoaded(true); // 데이터 로드 상태를 true로 설정
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <Container>
      <ExplanationArea>
        <h2 style={{ marginTop: "15px", whiteSpace: "pre-wrap" }}>핫딜 추천 상품 </h2>
        <h3 style={{ marginTop: "20px" }}>| BEBID 에서 현재 인기있는 경매품목입니다.</h3>
      </ExplanationArea>
      {dataLoaded && (
        <LargeItem
          title={LargeDataTitle}
          startprice={LargeDataPrice}
          picture={<img src={gdArray[0]}/>} // 첫 번째 이미지 사용
        />
      )}

      {dataLoaded && imagesLoaded && (
        <SmallFrameArea>
          {Data.slice(1, 7).map((item, index) => (
            <SmallItem
              key={index} {...item}
              picture={<img src={gdArray[index + 1]} />} // 첫 번째 이후의 이미지를 사용
            />
          ))}
        </SmallFrameArea>
      )}
    </Container>
  );
};

export default HotdealContent;
