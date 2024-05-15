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


  useEffect(() => { //  DB 배열을 불러오는 로직임
    const fetchData = async () => {
      try {
        const response = await axios.get('https://port-0-cpbeck-hdoly2altu7slne.sel5.cloudtype.app/api/users/getcontents');
        const Item = response.data;
        setInfo(Item);
        console.log(Item);
      } 
      catch (error) {
        console.log('error');
      }
    };  
    fetchData();
  }, []);

  useEffect(()=> {
    info.map(()=> {
      return (
        console.log(1)
      )
    })
  }, []);

  useEffect(() => { //  구글드라이브의 이미지를 불러오는 로직임 ㅇㅅㅇ
    const fetchImage = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/drive/v3/files?q=name='${FILE_NAME}'+and+'${DRIVE_FOLDER_ID}'+in+parents&fields=files(id,name,thumbnailLink)`, {
          params: {
            key: API_KEY,
            pageSize: 1
          }
        });
        const imageData = response.data.files[0];
        console.log(3);
        setImage(imageData);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, []);

  return (
    <Container>
      <Frame>
        {info.slice(0,5).map((item, index) => (
          <ItemFrame
            key={index}
            Product={item.title}
            Price={item.startprice}            
            Image={image.thumbnailLink}
          />
        ))}
      </Frame>
    </Container>
  )
}

export default Home2;