import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 20vh;
  position: sticky;
  z-index: 10;
  top: 0;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid gray;
`;

const Frame = styled.div`
  width: 1400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const SiteMap = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

  ul {
    margin: 0% 2% 0% 2%;
  }

  a {
    display: flex;
    width: 10%;
  }
`;

const Title = styled.div`
  width: 100%;
  height: 55%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  a {
    width: 110px;
  }
`;

const TitleLeft = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  span {
    font-size: 40px; 
    font-weight: bold;
  }

  a {
    width: 230px;
    display: flex;
    align-items: center;
    justity-content: center;
  }

  h1 {
    font-size: 45px;
    color: salmon;
  }

  img {
    width: 25%;
    margin-right: 3%;
  }
`;

const TitleRight = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  h2 {
    font-size: 20px;
    margin: 0% 2% 0% 2%;
  }
`;

const StyleInput = styled.input`
  width: 70%;
  margin-left: 2%;
  padding: 1% 0% 1% 1%;
  font-size: 20px;
  border: 2px solid salmon;
  background-color: rgb(247,247,247)
`;

const LinkStyle = {
  textDecoration: "none",
  color: "black",
  margin: "0px",
  padding: "0px",
  display: "flex",
}

const NavBarContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  background-color: white;
`;

const NavBarItem = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(()=> {

    if (token) {
      setIsLoggedIn(true);
    }
    else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    return (
      localStorage.removeItem('token'),
      setIsLoggedIn(false)
    );
  };

  const enterMypage = () => {
    if (token) {
      return (
        navigate('/MyPage')
      )
    }
    else {
      return (
        alert('로그인을 해주세요'),
        navigate('/SignIn')
      )
    }
  }

  const categoryList = ["중고경매" , "핫템" , "이벤트" , "커뮤니티" , "고객지원"]

  return (
    <>
      <Container>
        <Frame>
          <SiteMap>
            {isLoggedIn ? (
              <Link to="/" style={LinkStyle}>
                <ul onClick={handleLogout}>로그아웃</ul>
              </Link>
              ) : ( 
              <Link to="/SignIn" style={LinkStyle}>
              <ul>로그인 / 회원가입</ul>
              </Link>
              )}

              <ul>고객센터</ul>
          </SiteMap>
          <Title>
            <TitleLeft>
              <Link to="/" style={LinkStyle}>
                  <img src="/images/BebidIcon.png" />
                  <h1>BE BID</h1>
              </Link>
              <StyleInput placeholder="검색어를 입력해주세요"/>
            </TitleLeft>
            <TitleRight>
              <Link to="/Auction" style={LinkStyle}>
                <h2>경매올리기</h2>
              </Link>

              <Link to="/Bid" style={LinkStyle}>
                <h2>입찰페이지</h2>
              </Link>

              <h2 onClick={enterMypage} style={{marginRight:"5%" , cursor:"pointer"}}>마이페이지</h2>
            </TitleRight>
          </Title>
          <NavBarContainer>
            {/* {categoryList.map((item) => {
              <NavBarItem onMouseEnter={AddedMenuOpen} onMouseLeave={AddedMenuClose}>중고거래</NavBarItem>
            })} */}
            <NavBarItem>중고거래</NavBarItem>
            <NavBarItem>핫 템!</NavBarItem>
            <NavBarItem>이벤트</NavBarItem>
            <NavBarItem>커뮤니티</NavBarItem>
            <NavBarItem>고객지원</NavBarItem>
            <NavBarItem>카테고리</NavBarItem>
          </NavBarContainer>
        </Frame>
      </Container>
    </>
  );
};

export default Header;