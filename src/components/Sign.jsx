import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Video from "../asset/beach.mp4";

const VideoFrame = styled.video`
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   object-fit: cover; /* 비디오가 화면을 채우도록 설정 */
   z-index: -1; /* 컨텐츠 위에 비디오가 표시되도록 설정 */
`;

const Frame = styled.div`
   width: 100vw;
   height: 100vh;
   position: relative; /* 포지션을 설정하여 자식 요소의 위치를 결정합니다. */
`;

const Wrap = styled.div`
   position: relative;
   max-width: 1200px;
   height: 100%;
   margin: 0 auto;
`;

const LoginIn = styled.div`
   position: absolute;
   top: 50%;
   transform: translateY(-50%);
   width: 100%;
`;

const LoginCont = styled.div`
   float: left;
   max-width: 500px;
   width: 100%;
   padding: 60px 40px 53px;
   background: #fff;
   border-radius: 20px;
   box-sizing: border-box;
`;

const InjeNaraText = styled.div`
   color: #fff;
   display: flex;
   justify-content: center;

   p{
      margin:0;
      padding:0;
      font-size: 50px;
      font-weight: 600;
      margin-left: 20px;
      margin-bottom: 40px;
   }
`;

const LinkStyle = {
   textDecoration: "none",
   color: "lightsalmon"
};

const Sign = ({ props }) => {
   return (
      <Frame>
         <VideoFrame autoPlay loop muted>
            <source src={Video} type="video/mp4" />
         </VideoFrame>
         <Wrap>
            <LoginIn>
               <LoginCont>
               <InjeNaraText>
                  <img src="images/BeBidIcon.png" alt="BeBidIcon" style={{marginTop:"20px" , width:"50px" , height:"80px"}}/>
                  <p style={{fontSize:"80px"}}>
                     <Link to="/" style={LinkStyle}>BeBid</Link>
                  </p>
               </InjeNaraText>
                  {props}
               </LoginCont>

            </LoginIn>
         </Wrap>
      </Frame>
   )
}

export default Sign;