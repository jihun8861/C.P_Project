import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import SubBanner from "../components/SubBanner";
import ItemFrame from "../components/ItemFrame";
import SkeletonItemFrame from "../components/SkeletonItemFrame"; // 스켈레톤 프레임 import
import axios from "axios";
import DailyModal from "../components/DailyModal";
import { ImTelegram } from "react-icons/im";

const Container = styled.div`
  width: 1200px;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const Frame = styled.div`
  width: 1200px;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const HomeContent = () => {
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [info, setInfo] = useState([]);
  const [image, setImage] = useState('');
  const [fileData, setFileData] = useState([]);
  const [count, setCount] = useState(0);
  const [images, setImages] = useState([]);

  const API_KEY = 'AIzaSyAxAqJYZSKbF7pm5XHril-dndv4HdVrbz4';
  const DRIVE_FOLDER_ID = '1-1w_h8t3ICtJRC57iUuTG-Mwy5sUFXJQ';
  const FILE_NAME = '202404031640073ee624efd45c646d738d0ded223b2e5c.jpg';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const DBresponse = await axios.get('https://port-0-cpbeck-hdoly2altu7slne.sel5.cloudtype.app/api/users/getcontents');
        setInfo(DBresponse.data);
        console.log(DBresponse.data);

        let tempFileData = DBresponse.data.map(item => item.picture);
        console.log(tempFileData);

        let tempImages = []; // 임시 이미지 배열

        for (let i = 0; i < DBresponse.data.length; i++) {
          const GCresponse = await axios.get(`https://www.googleapis.com/drive/v3/files?q=name='${tempFileData[i]}' and '${DRIVE_FOLDER_ID}' in parents&fields=files(id,name,thumbnailLink)`, {
            params: {
              key: API_KEY,
              pageSize: 1
            }
          });

          // 임시 배열에 이미지 정보 추가
          tempImages.push(GCresponse.data.files[0]);
          console.log(tempImages);
        }

        // 상태 업데이트를 한 번에 처리
        setImages(tempImages);
        setIsLoading(false); // 로딩 완료 상태로 변경
      }
      catch (error) {
        console.log('error');
        setIsLoading(false); // 에러 발생 시에도 로딩 상태 변경
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      {/* <DailyModal/> */}
      <Banner />
      <SubBanner />
      <h2 style={{ marginTop: "3%" }}>마감 임박 경매</h2>
      <Frame>
        {isLoading ? (
          // 로딩 중에는 SkeletonItemFrame을 표시
          Array.from({ length: 10 }).map((_, index) => <SkeletonItemFrame key={index} />)
        ) : (
          info.map((item, index) => (
            <ItemFrame
              key={index}
              Product={item.title}
              Price={item.startprice}
              Image={images[index]?.thumbnailLink} // 옵셔널 체이닝 연산자 사용
              Array={item}
            />
          ))
        )}
      </Frame>
      <h2 style={{ marginTop: "3%" }}>최근에 올라온 경매</h2>
      <Frame>
        {isLoading ? (
          // 로딩 중에는 SkeletonItemFrame을 표시
          Array.from({ length: 5 }).map((_, index) => <SkeletonItemFrame key={index} />)
        ) : (
          info.slice(0, 5).map((item, index) => (
            <ItemFrame
              key={index}
              Product={item.title}
              Price={item.startprice}
              Image={images[index]?.thumbnailLink} // 옵셔널 체이닝 연산자 사용
              Array={item}
            />
          ))
        )}
      </Frame>
    </Container>
  )
}

const Home = () => {
  return <Layout props={<HomeContent />} />
};

export default Home;
