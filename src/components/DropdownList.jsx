import React, { useState } from "react";
import styled from "styled-components";
import LeftJson from "../json/Dropdown.json";

const Container = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;

`;

const DropdownLeft = styled.div`
  width: 33%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  box-sizing: border-box;
  overflow-Y: scroll;
`;

const DropdownCenter = styled.div`
  width: 33%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  box-sizing: border-box;
`;

const DropdownRight = styled.div`
  width: 33%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  box-sizing: border-box;
`;

const DropdownItem = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  padding: 0% 0% 3% 10%;
  align-items: center;
  justify-content: flex-start;
  font-size: 20px;
  cursor: pointer;
`;

const DropdownList = () => {

  const [selectL, setSelectL] = useState(false);

  return (
    <Container>
      <DropdownLeft>
        {LeftJson.map((item, kategory)=> (
          <DropdownItem key={kategory}>
            {item.name}
          </DropdownItem>
        ))}
      </DropdownLeft>
      <DropdownCenter>
        <h3>중분류 선택</h3>
      </DropdownCenter>
      <DropdownRight>
        <h3>대분류 선택</h3>
      </DropdownRight>
    </Container>
  );
};

export default DropdownList;