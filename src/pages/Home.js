import { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import SubBanner from "../components/SubBanner";
import ItemFrame from "../components/ItemFrame";
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
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow-x: auto;
`;

const HomeContent = () => {

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
          const GCresponse = await axios.get(`https://www.googleapis.com/drive/v3/files?q=name='${tempFileData[i]}'+and+'${DRIVE_FOLDER_ID}'+in+parents&fields=files(id,name,thumbnailLink)`, {
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
      } 
      catch (error) {
        console.log('error');
      }
    };  
    fetchData();
  }, []);

  
  return (
    <Container>
      {/* <DailyModal/> */}
      <Banner />
      <SubBanner />
      <h2 style={{marginTop:"3%"}}>마감 인박 경매</h2>
      <Frame>
        {info.slice(0, 7).map((item, oldest) => (         
          <ItemFrame
            key={oldest}
            Product={item.title}
            Price={item.startprice}            
            Image={images[oldest]?.thumbnailLink} // 옵셔널 체이닝 연산자 사용
            Array={item}
          />
        ))}
      </Frame>
      <h2 style={{marginTop:"3%"}}>최근에 올라온 경매</h2>
      <Frame>
        {info.slice(0, 7).map((item, eldest) => (
          <ItemFrame
            key={eldest}
            Product={item.title}
            Price={item.startprice}            
            Image={images[eldest]?.thumbnailLink} // 옵셔널 체이닝 연산자 사용
            Array={item}
          />
        ))}
      </Frame>
      
      

    </Container>
  )
}

const Home = () => {
  return <Layout props={<HomeContent />} />
};
export default Home;