import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 20%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 1px solid black;
  background-color: red;
`;

const TextArea = styled.div`

`;

const PriceArea = styled.div`

`

const MyPageItemBox = () => {
  return (
    <Container>
      <h1>씨발</h1>
    </Container>
  )
}

export default MyPageItemBox;