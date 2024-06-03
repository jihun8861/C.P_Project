import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import SubBanner from "../components/SubBanner";
import ItemFrame from "../components/ItemFrame";
import SkeletonItemFrame from "../components/SkeletonItemFrame"; // 스켈레톤 프레임 import
import axios from "axios";
import { IoMdHeartEmpty } from "react-icons/io";
import HotdealContent from "../components/HotdealContent";

const Container = styled.div`
  width: 1200px;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

const Frame = styled.div`
  width: 1200px;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const Advertisement = styled.div`
  width: 160px;
  height: 600px;
  left: 150px;
  bottom: 150px;
  position: fixed;
  z-index: 2;
  background-image: url("images/adv.png");
  background-size: 100% 100%; 
  background-position: center;
  cursor: pointer;
  &:hover {
    opacity: 80%;
  }
`;

const ScrollBoxContainer = styled.div`
  width: 120px;
  height: 300px;
  right: 180px;
  bottom: 448px;
  position: fixed;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  background-size: 100% 100%; 
  background-position: center;
  cursor: pointer;
`;

const ScrollBoxFrame = styled.div`
  width: 120px;
  height: 84%;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5%;
  position: relative;
  h3 {
    color: #888888;
    padding-top: 20%;
  }
  h5 {
    padding-top: 10%;
    color: #888888;
    position: absolute;
  }
`;

const StyledHr = styled.hr`
  width: 80%;
  border: 1px dotted lightgray;
`;

const TopBox = styled.div`
  width: 100%;
  height: 14%;
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ScrollBox = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ScrollBoxContainer>
      <ScrollBoxFrame>
        <h5>찜한 상품</h5>
        <h3>.........</h3>
        <IoMdHeartEmpty style={{marginTop:"30%", width:"30px", height:"30px", color:"#888888"}}/>
        <h5 style={{bottom: '80px'}}>찜한 상품이</h5><h5 style={{bottom: '63px'}}>없습니다.</h5>
      </ScrollBoxFrame>
      <TopBox onClick={handleScrollToTop}>TOP</TopBox>
    </ScrollBoxContainer>
  )
}

const SkeletonAnimation = keyframes`
0% {
  background-position: -200% 0;
}
100% {
  background-position: 200% 0;
}
`;

const SkeletonText = styled.div`
  width: 200px;
  height: 40px;
  background: linear-gradient(90deg, #f0f0f0, #f5f5f5, #f0f0f0);
  background-size: 200% 100%;
  animation: ${SkeletonAnimation} 1.5s infinite;
  margin-top: 3%;
  margin-bottom: 3%;
`;

const HomeContent = () => {
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [info, setInfo] = useState([]);
  const [recentInfo, setRecentInfo] = useState([]);
  const [images, setImages] = useState([]);

  const API_KEY = 'AIzaSyAxAqJYZSKbF7pm5XHril-dndv4HdVrbz4';
  const DRIVE_FOLDER_ID = '1-1w_h8t3ICtJRC57iUuTG-Mwy5sUFXJQ';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const DBresponse = await axios.get('https://port-0-cpbeck-hdoly2altu7slne.sel5.cloudtype.app/api/users/getcontents');
        
        // start_time을 기준으로 정렬 (오름차순)
        const sortedData = DBresponse.data.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
        setInfo(sortedData);

        // start_time을 기준으로 역순 정렬 (내림차순)
        const reversedData = [...sortedData].reverse();
        setRecentInfo(reversedData);

        console.log('Sorted Data:', sortedData);
        console.log('Reversed Data:', reversedData);

        let tempFileData = sortedData.map(item => item.picture);
        console.log('Temp File Data:', tempFileData);

        // 병렬 요청으로 이미지 가져오기
        let tempImages = await Promise.all(tempFileData.map(async (fileName) => {
          const GCresponse = await axios.get(`https://www.googleapis.com/drive/v3/files?q=name='${fileName}' and '${DRIVE_FOLDER_ID}' in parents&fields=files(id,name,thumbnailLink)`, {
            params: {
              key: API_KEY,
              pageSize: 1
            }
          });
          return GCresponse.data.files[0].thumbnailLink;
        }));

        // 임시 이미지 배열을 상태로 설정
        setImages(tempImages);
        setIsLoading(false); // 데이터 로딩 완료

      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false); // 데이터 로딩 오류 발생 시에도 로딩 상태 해제
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Advertisement/>
      <ScrollBox/>
      <Banner />
      <SubBanner />
      {isLoading ? (
        <SkeletonText />
      ) : (
        <h2 style={{ marginTop: "3%", marginBottom: "3%"}}>마감 임박 경매</h2>
      )}

      <Frame>
        {isLoading ? (
          // 로딩 중에는 SkeletonItemFrame을 표시
          Array.from({ length: 10 }).map((_, index) => <SkeletonItemFrame key={index} />)
        ) : (
          info.slice(0,10).map((item, index) => (
            <ItemFrame
              key={index}
              Product={item.title}
              Price={item.startprice}
              Image={images[index]} // 인덱스를 통해 이미지 매핑
              Array={item}
            />
          ))
        )}
      </Frame>
      {isLoading ? (
        <SkeletonText />
      ) : (
        <h2 style={{ marginTop: "3%", marginBottom: "3%"}}>최근 올라온 경매</h2>
      )}
      <Frame>
        {isLoading ? (
          // 로딩 중에는 SkeletonItemFrame을 표시
          Array.from({ length: 5 }).map((_, index) => <SkeletonItemFrame key={index} />)
        ) : (
          recentInfo.slice(0, 10).map((item, index) => (
            <ItemFrame
              key={index}
              Product={item.title}
              Price={item.startprice}
              Image={images[images.length - 1 - index]} // 역순으로 접근하여 이미지 매핑
              Array={item}
            />
          ))
        )}
      </Frame>
      <Frame>
        <HotdealContent></HotdealContent>
      </Frame>
    </Container>
  )
}

const Home = () => {
  return <Layout props={<HomeContent />} />
};

export default Home;