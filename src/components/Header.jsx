import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaUserLarge } from "react-icons/fa6";
import { RiCustomerService2Fill } from "react-icons/ri";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  height: 18vh;
  position: sticky;
  z-index: 10;
  top: 0;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #dadee5;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Frame = styled.div`
  width: 1200px;
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
    margin-left: 0px;
    height: 40px;
    min-width: 150px;
    text-decoration: none;
    color: black;
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
  width: 65%;
  height: 100%;
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
    justify-content: center;

  }

  h1 {
    font-size: 40px;
    color: salmon;
    display: flex;
    align-items: center;
    padding-bottom: 10px;
  }

  img {
    width: 25%;
    margin-right: 3%;
  }
`;

const TitleRight = styled.div`
  width: 35%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  h2 {
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
  }
`;

const InputFrame = styled.div`
  width: 65%;
  height: 40%;
  border: 2px solid salmon;
  display: flex;
  align-items: center;
`;

const StyleInput = styled.input`
  width: 90%;
  height: 100%;
  padding: 1% 0% 1% 1%;
  font-size: 16px;
  background-color: rgb(247,247,247);
  border: none;
  outline: none;
`;

const IconBox = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(247,247,247);
  cursor: pointer;
`;

const LinkStyle = {
  textDecoration: "none",
  color: "black",
  margin: "0px",
  padding: "0px",
}

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
        alert('마이페이지로 이동됨'),
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

  const enterAuction = () => {
    if (token) {
      return (
        alert('경매올리기로 이동됨'),
        navigate('/Auction')
      )
    }
    else {
      return (
        alert('로그인을 해주세요'),
        navigate('/SignIn')
      )
    }
  }

  const enterCustomerSupport = () => {
    if (token) {
      return (
        alert('고객지원으로 이동됨'),
        navigate('/SocketSelect')
      )
    }
    else {
      return (
        alert('로그인을 해주세요'),
        navigate('/SignIn')
      )
    }
  }

  const [SearchProduct, setSearchProduct] = useState('');
  const [bidMondey, setBidMoney] = useState();

  const productNameChange = ( e ) => {
    return (
      console.log(e.target.value),
      setSearchProduct(e.target.value)
    )
  };

  const sendProduct = () => {
    if (SearchProduct.trim()) {
      navigate('/SearchResult', { state: { query: SearchProduct } });
    }
  };

   const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
         sendProduct();
      }
   };

  const handleScrollToTop = () => {
    navigate("/");
    window.location.reload();
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://port-0-cpbeck-hdoly2altu7slne.sel5.cloudtype.app/api/users/my_page', {
          "data": {
            "authorization": token
          }
        })
        setBidMoney(response.data.cash)
      }
      catch(error) {
        console.log(error);
      }
    }
    fetchData();
  },[bidMondey])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://port-0-cpbeck-hdoly2altu7slne.sel5.cloudtype.app/api/price_data')
        console.log(response.data)
      }
      catch(error) {
        console.log(error);
      }
    }
  },[])

  return (
    <>
      <Container>
        <Frame>
          <SiteMap>
            {isLoggedIn ? (
              <Link to="/mypage" style={{textDecoration:"none"}}>
                <ul style={{textDecoration:"none"}}>비드머니: {bidMondey}원</ul>
              </Link>
              ) : ( 
                <h1></h1>
              )}
            {isLoggedIn ? (
              <Link to="/" style={{textDecoration:"none"}}>
                <ul onClick={handleLogout} style={{textDecoration:"none"}}>로그아웃</ul>
              </Link>
              ) : ( 
              <Link to="/SignIn" style={{textDecoration:"none"}}>
                <ul>로그인 / 회원가입</ul>
              </Link>
              )}
              <Link to="/Hotdeal" style={{textDecoration:"none"}}>
                <ul>고객센터</ul>
              </Link>
          </SiteMap>
          <Title>
            <TitleLeft>
              <Link to="/" style={LinkStyle}>
                  <img src="/images/BebidIcon.png" style={{width:"45px", height: "60px", paddingBottom:"5px"}}/>
                  <h1 onClick={handleScrollToTop}>BE BID</h1>
              </Link>
              <InputFrame>
                <StyleInput placeholder="검색어를 입력해주세요" onChange={productNameChange} onKeyDown={handleKeyDown}/>
                <IconBox>
                  <IoSearch style={{width:"20px", height: "30px"}} onClick={sendProduct}/>
                </IconBox>
              </InputFrame>
            </TitleLeft>
            <TitleRight>
              <h2 onClick={enterAuction} style={{marginRight:"10px" , cursor:"pointer"}}><MdOutlineAttachMoney style={{width:"26px", height:"26px"}} />경매올리기</h2>
              <h2 onClick={enterMypage} style={{marginRight:"10px" , cursor:"pointer"}}><FaUserLarge />마이페이지</h2>
              <h2 onClick={enterCustomerSupport} style={{marginRight:"10px" , cursor:"pointer"}}><RiCustomerService2Fill style={{width:"26px", height:"26px"}}/>고객지원</h2>
            </TitleRight>
          </Title>
        </Frame>
      </Container>
    </>
  );
};

export default Header;