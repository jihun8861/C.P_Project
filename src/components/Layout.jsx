import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

const Container = styled.div`
  min-height: 65vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Main = styled.div`
  width: 1400px;
  height: auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Layout = ( {props} ) => {
  return (
    <>
    <Container>
      <Header />
      <Main>
      {props}
      </Main>
    </Container>
      <Footer />
    </>
  );
};

export default Layout;