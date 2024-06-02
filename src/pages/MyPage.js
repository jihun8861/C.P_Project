import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import axios from "axios";

const Frame = styled.div`
    width: 100%;
    height: 65vh;
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
`;

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
    height: 45%;
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
    width: 100%;
    height: 20%;
    margin-top: 10px;
    p {
    font-size: 18px;
    color: #858c90;
    }
`;

const LTransactionBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 90%;
    height: 60%;
    border-radius: 10px;
    border: solid 1px lightgray;
    padding: 10px;
`;

const LBoxInL = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const LBoxInR = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LBoxChargingBtn = styled.button`
    width: 40%;
    height:40%;
    margin-right: 10px;
`

const LBoxWithdrawBtn = styled.button`
    width: 40%;
    height:40%;
    margin-right: 10px;
`

//오른쪽 박스 오른쪽 디자인(거래횟수, 출석)
const RightBoxR = styled.div`
    width: 50%;
    height: 100%;
`;

const RBoxL = styled.div`
    width: 85%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`;

const RBoxTop = styled.div`
    width: 100%;
    height: 40%;
    display: flex;
    flex-direction: row;
`;

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
`;

const RBoxTopR = styled.div`
    display: flex;
    height: 100%;
    font-weight: bold;
    margin-top: 15px;
    margin-left: 40px;
`;

const BoxGauge = styled.div`
    width: 90%;
    height: 60%;
    display: flex;
    align-items: center;
`;

// 이미지 공간
const RBoxR = styled.div`
    width: 100%;
    height: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;

const RBoxImage = styled.div`
    width: 15%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("images/basic.png");
    background-size: 100% 100%;
    margin-left: 20px;
`;

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
`;

const BoxRleft = styled.div`
    display: flex;
    align-items: center;
    margin-right: 10px;
    width: 18%;
    height: 70%;
    background-image: url("images/calendar.png");
    background-size: 100% 100%;
`;

const BoxRmid = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 55%;
    height: 100%;
    h2 {
        margin-bottom: 5px;
    }
`;

const BoxRright = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15%;
    height: 35%;
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
`;

const RightProduct = styled.div`
    width: 100%;
    height: auto;
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
`;

const StyledRange = styled.div`
    width: ${({ width }) => `${width}%`};
    height: 12px;
    border-radius: 15px;
    background: linear-gradient(to right, #FFACFC, #B76CFD);
`;

const ChargeModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); // 반투명 검은색 배경
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; // 모달이 다른 요소들 위에 오도록
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    h2 {
        margin-bottom: 20px;
    }

    input {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    button {
        padding: 10px 20px;
        margin: 5px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    button:first-of-type {
        background-color: #007bff;
        color: white;
    }

    button:last-of-type {
        background-color: #6c757d;
        color: white;
    }
`;

const BidList = () => {
    return (
        <>
            입찰목록
        </>
    );
};

const SellList = () => {
    return (
        <>
            판매중
        </>
    );
};


const MyPageContent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [selectedMenu, setSelectedMenu] = useState("BidList");
    const [modalKey, setModalKey] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const [name, setName] = useState('');
    const [isChargeModalOpen, setIsChargeModalOpen] = useState(false);
    const [chargeAmount, setChargeAmount] = useState(0);
    const [impReady, setImpReady] = useState(false);
    const [bidMoney, setBidMoney] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.post('https://port-0-cpbeck-hdoly2altu7slne.sel5.cloudtype.app/api/users/my_page', {
                    data: {
                        authorization: token
                    }
                });
                setUserInfo(response.data);
                if (response.data && response.data.nick_name) {
                    setName(response.data.nick_name);
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);

    useEffect(() => {
        const loadIamport = () => {
            const script = document.createElement('script');
            script.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
            script.onload = () => {
                if (window.IMP) {
                    window.IMP.init("imp44501216");
                    setImpReady(true);
                }
            };
            document.body.appendChild(script);
        };

        if (!window.IMP) {
            loadIamport();
        } else {
            window.IMP.init("imp44501216");
            setImpReady(true);
        }
    }, []);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleItemClick = (title, keys) => {
        setModalTitle(title);
        setModalKey(keys);
        setIsModalOpen(true);
    };

    const handleProductMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    const handleChargeClick = () => {
        setIsChargeModalOpen(true);
    };

    const closeChargeModal = () => {
        setIsChargeModalOpen(false);
    };

    const handleChargeSubmit = () => {
        if (!impReady) {
            alert('결제 모듈이 로드되지 않았습니다. 잠시 후 다시 시도해주세요.');
            return;
        }

        const myAmount = Number(chargeAmount);
        window.IMP.request_pay({
            pg: "kakaopay",
            pay_method: "card",
            name: "충전",
            amount: myAmount,
            buyer_email: "gildong@gmail.com",
            buyer_name: "홍길동",
            buyer_tel: "010-4242-4242",
            buyer_addr: "서울특별시 강남구 신사동",
            buyer_postcode: "01181",
            m_redirect_url: "" // 모바일 결제 후 리다이렉트 될 주소
        }, async (rsp) => {
            if (rsp.success) {
                const token = localStorage.getItem("token");
                try {
                    const response = await axios.post(
                        "http://localhost:3000/graphql",
                        {
                            query: `
                                mutation {
                                    buyTicket(impUid: "${rsp.imp_uid}", amount: ${rsp.paid_amount}, pay_method: "${rsp.pay_method}") {
                                        id
                                        count
                                        money
                                        method
                                    }
                                }
                            `,
                        },
                        {
                            headers: {
                                Authorization: "token" // 적절한 액세스 토큰으로 교체
                            }
                        }
                    );
                    console.log(response.data);
                    // Update user info with charged amount
                    setUserInfo((prevUserInfo) => ({
                        ...prevUserInfo,
                        bid_money: (prevUserInfo.bid_money || 0) + myAmount, // 기존 금액에 충전한 금액 추가
                    }));
                    setChargeAmount(0);
                    closeChargeModal(); // Close the modal after a successful charge
                } catch (error) {
                    console.error('결제 정보 등록 실패:', error);
                }
            } else {
                alert(`결제 실패: ${rsp.error_msg}`);
            }
        });
    };

    const exp = 100;
    const ratio = parseInt(37);

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
                        <li onClick={() => handleItemClick("찜한물품", "heartList")}>찜한물품</li>
                    </ul>
                </LeftMenu>
                {isModalOpen && (
                    <Modal title={modalTitle} modalKey={modalKey} onClose={closeModal} />
                )}
            </LeftBox>

            <RightBox>
                <RightInfoBox>
                    <RightBoxL>
                        <LTitle>{name}</LTitle>
                        <LExplain>
                            <p>거래를 한 후 거래횟수를 높여보세요</p>
                        </LExplain>
                        <LTransactionBox>
                            <LBoxInL>
                                비드머니 {userInfo?.bid_money || 0}원
                            </LBoxInL>
                            <LBoxInR>
                                <LBoxChargingBtn onClick={handleChargeClick}>
                                    충전
                                </LBoxChargingBtn>
                                <LBoxWithdrawBtn>
                                    출금
                                </LBoxWithdrawBtn>
                            </LBoxInR>
                        </LTransactionBox>
                    </RightBoxL>
                    <RightBoxR>
                        <RBoxR>
                            <RBoxL>
                                <RBoxTop>
                                    <RBoxTopL>
                                        <h2>거래횟수</h2>
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
                                몇 번 출석했는지 확인하쇼
                            </BoxRmid>
                            <BoxRright>버튼</BoxRright>
                        </BoxR>
                    </RightBoxR>
                </RightInfoBox>

                <RightProduct>
                    <h2>내 상품</h2>
                    <ProductMenu>
                        <ProductMenuItem2 onClick={() => handleProductMenuClick("BidList")}>
                            입찰중
                        </ProductMenuItem2>
                        <ProductMenuItem3 onClick={() => handleProductMenuClick("SellList")}>
                            판매중
                        </ProductMenuItem3>
                    </ProductMenu>
                    <ProductBox>{selectedMenu}</ProductBox>
                </RightProduct>
            </RightBox>

            {isChargeModalOpen && (
                <ChargeModal>
                    <ModalContent>
                        <h2>충전하기</h2>
                        <input
                            type="number"
                            value={chargeAmount}
                            onChange={(e) => setChargeAmount(e.target.value)}
                            placeholder="충전할 금액을 입력하세요"
                        />
                        <button onClick={handleChargeSubmit}>충전</button>
                        <button onClick={closeChargeModal}>취소</button>
                    </ModalContent>
                </ChargeModal>
            )}
        </Frame>
    );
};

const MyPage = () => {
    return <Layout props={<MyPageContent />} />;
};

export default MyPage;