import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import Modal from "../components/Modal";

const Frame = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    margin-top: 7%;
  `;

//여기부터 왼쪽 박스의 내용
const LeftBox = styled.div`
    width: 15%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    p {
      padding-bottom: 30px;
      font-size: 23px;
      font-weight: bold;
    }
  `;

const LeftMenu = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    h2 {
      margin-bottom: 20px;
      font-size: 22px;
    }
    li {
      list-style-type: none;
      margin-bottom: 20px;
      color: #343434;
      cursor: pointer;
    }
  `;

const LeftHr = styled.div`
    width: 100%;
    border-bottom: solid 1px;
    margin-bottom: 30px;
    margin-top: 10px;
    color: #dadee5;
  `

//여기부터 오른쪽 박스의 내용
const RightBox = styled.div`
    width: 85%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 50px;
  `;

const RightInfoBox = styled.div`
    width: 100%;
    height: 30%;
    padding: 20px;
    display: flex;
    flex-direction: row;
    margin-bottom: 100px;
  `;

//오른쪽 박스의 왼쪽 내용(사용자 이름, 횟수)
const RightBoxL = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
  `;

const LTitle = styled.h1`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 20%;
  `;

const LExplain = styled.div`
    display: flex;
    width:100%;
    height: 20%;
    margin-top: 10px;
    p {
      font-size: 18px;
      color: #858c90;
    }
`

const LTransactionBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 60%;
  border-radius: 10px;
  border: solid 1px lightgray;
`;

const LBoxIn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid lightgray;
    flex-direction: column;
    width: 100%;
    height: 40%;
`;

const LBoxInR = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 40%;
`;

const LBoxInText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40%;
    font-weight: bold;
    font-size: 24px;
    margin-top: 8px;
`;

//오른쪽 박스 오른쪽 디자인(신뢰지수, 출석)
const RightBoxR = styled.div`
    width: 50%;
    height: 100%;
  `

const RBoxL = styled.div`
    width: 85%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  `

const RBoxTop = styled.div`
    width:100%;
    height: 40%;
    display: flex;
    flex-direction: row;
`

const RBoxTopL = styled.div`
  display: flex;
  align-items: center;
  width: 75%;
  height: 100%;
  font-weight: bold;

  h2 {
    margin-left: 5px;
    margin-bottom: 3px;
    font-size: 20px;
  }
`

const RBoxTopR = styled.div`
  display: flex;
  height: 100%;
  font-weight: bold;
  margin-top: 15px;
  margin-left: 40px;
`

const BoxGauge = styled.div`
  width: 90%;
  height: 60%;
  display: flex;
  align-items: center;
`

// 이미지 공간
const RBoxR = styled.div`  
    width: 100%;
    height: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
  `

const RBoxImage = styled.div`
    width: 15%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("images/basic.png");
    background-size: 100% 100%;
    margin-left: 20px;
  `

// 여기부터 출석체크하는 박스 디자인
const BoxR = styled.div`
    width: 100%;
    height: 60%;
    border-radius: 15px;
    border-color: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    background-color: #f7f7f7;
    margin-top: 25px;
  `

const BoxRleft = styled.div`
    display: flex;
    align-items: center;
    margin-right: 10px;
    width: 18%;
    height: 70%;
    background-image: url("images/calendar.png");
    background-size: 100% 100%;
`

const BoxRmid = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 55%;
  height: 100%;
  h2{
    margin-bottom: 5px;
  }
`

const BoxRright = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15%;
  height: 30%;
  border-radius: 15px;
  border: none;
  font-weight: bold;
  color: white;
  background-color: black;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background: #202020;
}
`

const RightProduct = styled.div`
    width: 100%;
    height: 30%;
    h2 {
      padding: 10px;
    }
    border: solid 1px;
  `;

const ProductMenu = styled.div`
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    border-bottom: solid 1px lightgray;
  `;

const ProductMenuItem1 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20%;
    height: 100%;
    cursor: pointer;
    border-bottom: solid 2px black;
  `;

const ProductMenuItem2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  height: 100%;
  cursor: pointer;
  border-bottom: solid 2px red;
`;

const ProductMenuItem3 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20%;
    height: 100%;
    cursor: pointer;
    border-bottom: solid 2px blue;
  `;

const ProductBox = styled.div`
    width: 100%;
    height: 60%;
  `;

// 게이지 디자인
const StyledBase = styled.div`
  display: flex;
  flex-direction: row;
  height: 12px;
  width: 100%;
  border: none;
  border-radius: 15px;
  background-color: #e0e0e0;
`

const StyledRange = styled.div`
  width: ${({ width }) => `${width}%`};
  height: 12px;
  border-radius: 15px;
  background: linear-gradient(to right, #FFACFC, #B76CFD);
`;

const Hello = styled.div`
    display: flex;
    align-items: center;
    margin-top: 30px;
`

const Entire = () => {
  return (
    <>
      <Hello>
        전체
      </Hello>
    </>
  )
};

const Sell = () => {
  return (
    <>
      <Hello>
        판매중
      </Hello>
    </>
  )
};

const Clear = () => {
  return (
    <>
     <Hello>
        판매완료
      </Hello>
    </>
  )
};

const MyPageContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState(""); // 모달 제목을 상태로 관리
  const [selectedMenu, setSelectedMenu] = useState(Entire);
  const [modalKey, setModalKey] = useState('')
  //  기존의 콘텐츠 형식으로 넘기던 프롭스를 키값으로 넘겨
  // 모달 컴포넌트를 띄울 때 키 값을 보낸다.
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleItemClick = (title, keys) => {
    // 리스트 아이템 클릭 핸들러
    setModalTitle(title); // 모달 제목 설정
    setModalKey(keys) // 셋 콘텐츠를 키값 수정으로 변경 그 외 제목 설정 모달 오픈 관련 스테이트는 남겨둠
    setIsModalOpen(true); // 모달 열기
  };

  const handleProductMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const exp = 100;
  const ratio = parseInt(60); // parseInt((exp % 100) * 100 / 100); <-- 원본

  return (
    <Frame>
      <LeftBox>
        <p>마이페이지</p>
        <LeftMenu>
          <h2>내 정보</h2>
          <li onClick={() => handleItemClick("비밀번호 변경", "edit")}>비밀번호 변경</li>
          <li onClick={() => handleItemClick("탈퇴하기", "withdraw")}>탈퇴하기</li>

          <LeftHr />

          <ul>
            <h2>거래 정보</h2>
            <li onClick={() => handleItemClick("구매내역", "buyList")}>구매내역</li>
            <li onClick={() => handleItemClick("판매내역", "sellList")}>판매내역</li>
          </ul>
        </LeftMenu>
        {isModalOpen && (
          <Modal title={modalTitle} modalKey={modalKey} onClose={closeModal} />
        )}
      </LeftBox>

      <RightBox>

        <RightInfoBox>
          <RightBoxL>
            <LTitle>사용자 이름</LTitle>

            <LExplain>
              <p>거래를 한 후 신뢰지수를 높여보세요</p>
            </LExplain>

            <LTransactionBox>

              <LBoxIn>
                총 거래 횟수
                <LBoxInText>
                  0
                </LBoxInText>
              </LBoxIn>

              <LBoxIn>
                구매 횟수
                <LBoxInText>
                  0
                </LBoxInText>
              </LBoxIn>

              <LBoxInR>
                판매 횟수
                <LBoxInText>
                  0
                </LBoxInText>
              </LBoxInR>
            </LTransactionBox>
          </RightBoxL>

          <RightBoxR>
            <RBoxR>
              <RBoxL>
                <RBoxTop>
                  <RBoxTopL>
                    <h2>신뢰지수</h2>
                    <h2>{ratio}</h2>
                  </RBoxTopL>
                  <RBoxTopR>
                    <p>100</p>
                  </RBoxTopR>
                </RBoxTop>
                <BoxGauge>
                  <StyledBase>
                    <StyledRange width={ratio} />
                  </StyledBase>
                </BoxGauge>
              </RBoxL>

              <RBoxImage />
            </RBoxR>

            <BoxR>
              <BoxRleft></BoxRleft>
              <BoxRmid>
                <h2>출석확인하러가기</h2>
                님이 몇 번을 출석했는지 확인하셈 ~
              </BoxRmid>
              <BoxRright>버튼</BoxRright>
            </BoxR>
          </RightBoxR>
        </RightInfoBox>

        <RightProduct>
          <h2>내 상품</h2>
          <ProductMenu>
            <ProductMenuItem1
              onClick={() => handleProductMenuClick(Entire)}>
              전체
            </ProductMenuItem1>

            <ProductMenuItem2
              onClick={() => handleProductMenuClick(Sell)}>
              판매중
            </ProductMenuItem2>

            <ProductMenuItem3
              onClick={() => handleProductMenuClick(Clear)}>
              판매완료
            </ProductMenuItem3>
          </ProductMenu>
          <ProductBox>{selectedMenu}</ProductBox>
        </RightProduct>

      </RightBox>
    </Frame>
  );
};

const MyPage = () => {
  return <Layout props={<MyPageContent />} />;
};

export default MyPage;