// Layout.js

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import LoginExtension from "./LoginExtension";

const Container = styled.div`
  min-height: 66vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Main = styled.div`
  max-width: 1920px;
  min-width: 1200px;
  height: auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
`;


const Layout = ({ props }) => {
  const [showLoginExtension, setShowLoginExtension] = useState(false);
  const [logoutTrigger, setLogoutTrigger] = useState(false); // 로그아웃 트리거 상태 추가
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const timer = setTimeout(() => {
        setShowLoginExtension(true);
      }, 100000);
      return () => clearTimeout(timer);
    }
  }, [logoutTrigger]); // logoutTrigger 상태 변경 시에만 useEffect 실행

  const handleExtend = () => {
    setShowLoginExtension(false);
    const timer = setTimeout(() => {
      setShowLoginExtension(true);
    }, 1800000);
    return () => clearTimeout(timer);
  };

  const handleLogout = () => {
    navigate('/')
    localStorage.removeItem("token");
    setShowLoginExtension(false);
    window.location.reload()
  };

  // 남은 시간을 HH:MM:SS 형식으로 변환하는 함수
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <Container>
        <Header onLogout={handleLogout} /> {/* 로그아웃 함수를 Header 컴포넌트에 전달 */}
        <Main>
          {showLoginExtension && (
            <LoginExtension
              onExtend={handleExtend}
              onLogout={handleLogout}
            />
          )}
          {props}
        </Main>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;