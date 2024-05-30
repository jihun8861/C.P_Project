import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 250px;
  margin-top: 3%;
  background-image: url("/SubBanner.png");
  background-size: 100% 100%; 
  background-position: center;
  cursor: pointer;
`;

const SubBanner = () => {
  return (
    <Container />
  )
}

export default SubBanner;