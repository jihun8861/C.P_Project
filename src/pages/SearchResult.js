import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  height: auto;
  background-color: white;
`;

const SearchBox = styled.div`
  width: 100%;
  height: 100vh;
`;

const SmallArea = styled.div`
  width: 100%;
  height: 100px;
  border-bottom: 2px solid black;
  display: flex;
  align-items: center;
  span {
    margin-left: 20px;
  }
`;

const LargeArea = styled.div`
  width: 100%;
  height: 300px;
  border: 1px solid black;
`;

const SearchResultContent = () => {

  const location = useLocation();
  const { query } = location.state || { query: '' };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://port-0-cpbeck-hdoly2altu7slne.sel5.cloudtype.app/api/search', {
          "data": {
            "search": query
          }
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [])



  return (
    <Container>
      <SmallArea>
        <h1>'{query}' 검색결과</h1>
        <span>총 20개</span>
      </SmallArea>
      <LargeArea>
        <SmallArea>카테고리</SmallArea>
        <SmallArea>가격</SmallArea>
        <SmallArea>옵션</SmallArea>
      </LargeArea>
    </Container>
  );
};

const SearchResult = () => {
  return <Layout props={<SearchResultContent />} />;
};

export default SearchResult;