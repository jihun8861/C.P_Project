import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ItemFrame from "../components/ItemFrame";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: lightsalmon;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Frame = styled.div`
  width: 1000px;
  height: 600px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
`;



const Home2 = () => {
  
  const API_KEY = 'AIzaSyAxAqJYZSKbF7pm5XHril-dndv4HdVrbz4';
  const DRIVE_FOLDER_ID = '1-1w_h8t3ICtJRC57iUuTG-Mwy5sUFXJQ';
  const FILE_NAME = '202405130605119f5a99097c3467449a639a40b32d0ae4.jpg'; 

  const [info, setInfo] = useState([]);
  const [image, setImage] = useState('');
  const [fileData, setFileData] = useState([]);
  const [count, setCount] = useState(0);
  const [images, setImages] = useState([]);

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
      <Frame>
        {info.map((item, index) => (
          <ItemFrame
            key={index}
            Product={item.title}
            Price={item.startprice}            
            Image={images[index]?.thumbnailLink} // 옵셔널 체이닝 연산자 사용
          />
        ))}
      </Frame>
    </Container>
  )
}

export default Home2;