import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";
import axios from "axios";
import ItemFrame from "../components/ItemFrame";

const Container = styled.div`
  width: 100%;
  height: auto;
`;

const SearchBox = styled.div`
  width: 100%;
  height: 100vh;
`;

const SmallArea = styled.div`
  width: 100%;
  height: 100px;
  border-bottom: 2px solid lightgray;
  display: flex;
  align-items: center;
  span {
    margin-left: 15px;
    margin-top: 10px;
    color: gray;
    font-size: 20px;
  }
`;

const LargeArea = styled.div`
  width: 1200px;
  height: auto;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 5%;
`;

const SearchResultContent = () => {
  const location = useLocation();
  const { query } = location.state || { query: '' };
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [imgArray, setImageArray] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const API_KEY = 'AIzaSyAxAqJYZSKbF7pm5XHril-dndv4HdVrbz4';
  const DRIVE_FOLDER_ID = '1-1w_h8t3ICtJRC57iUuTG-Mwy5sUFXJQ';

  // fetchData 함수는 검색 결과를 가져옵니다
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://port-0-cpbeck-hdoly2altu7slne.sel5.cloudtype.app/api/search', {
          data: {
            search: query
          }
        });
        console.log(response.data);
        setProducts(response.data);
        const newImgArray = response.data.map(item => item.picture);
        setImageArray(newImgArray);
        setDataLoaded(true); // 데이터 로드 상태를 true로 설정
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [query]);

  // fetchImages 함수는 Google Drive에서 이미지를 가져옵니다
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const newImages = [];
        for (let i = 0; i < imgArray.length; i++) {
          const response = await axios.get(`https://www.googleapis.com/drive/v3/files?q=name='${imgArray[i]}' and '${DRIVE_FOLDER_ID}' in parents&fields=files(id,name,thumbnailLink)`, {
            params: {
              key: API_KEY,
              pageSize: 1
            }
          });
          newImages.push(response.data.files[0]?.thumbnailLink || ''); // 썸네일 링크 저장
          console.log(response.data.files[0]?.thumbnailLink);
        }
        setImages(newImages);
        setImagesLoaded(true); // 이미지 로드 상태를 true로 설정
      } catch (error) {
        console.log('gderror', error);
      }
    };

    if (imgArray.length > 0) {
      fetchImages();
    }
  }, [imgArray]);

  return (
    <Container>
      <SmallArea>
        <h1 style={{ color: "red" }}>{query}</h1><h1>의 검색결과</h1>
        <span>{products.length}개</span>
      </SmallArea>
      <LargeArea>
        {dataLoaded && imagesLoaded && products.map((item, index) => (
          <ItemFrame
            key={index}
            Product={item.title}
            Price={item.startprice}
            Image={images[index]} // 가져온 썸네일 링크를 사용
            Array={item} // 배열 전체를 전달합니다
          />
        ))}
      </LargeArea>
    </Container>
  );
};

const SearchResult = () => {
  return <Layout props={<SearchResultContent />} />;
};

export default SearchResult;
