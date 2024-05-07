import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
`;

const NavBar = ( {props} ) => {
  return (
    <Container>
      {props}
    </Container>
  );
};

export default NavBar;