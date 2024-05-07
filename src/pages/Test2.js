import { useState } from "react";
import styled from "styled-components";
import DailyModal from "../components/DailyModal";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to right, purple , salmon)
`;

const Frame = styled.div`
  width: 50%;
  height: 200px;
  border: 1px solid black;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Box = styled.div`
  width: 180px;
  height: 80%;
  border: 1px solid black;
  background-image: linear-gradient(black, blue)
`;

const BtnArea = styled.div`
  width: 90px;
  height: 100%;
  box-sizing: border-box;
`;

const BtnAreaBox = styled.div`
  width: 100%;
  height: 50%;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  cursor: pointer;
`;

const Test2 = () => {

  const [item, setItem] = useState([]);

  const addItem = () => {
      if (item.length <= 2) setItem([...item, <Box key={item.length} />])
  }

  const delItem = () => {
      const newItem = [...item];
      newItem.pop(); // 마지막 요소 제거
      setItem(newItem);
  }

  return (
    <Container>
      <DailyModal />
      <Frame>
        {item}
        <Box />
          <BtnArea>
            <BtnAreaBox onClick={addItem}>
              <h1>+</h1>
            </BtnAreaBox>
            <BtnAreaBox onClick={delItem}>
              <h1>-</h1>
            </BtnAreaBox>
          </BtnArea>
      </Frame>
    </Container>
  );
}

export default Test2;