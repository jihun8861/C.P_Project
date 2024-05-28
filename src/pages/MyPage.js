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
        const [modalTitle, setModalTitle] = useState(""); // 모달 제목을 상태로 관리
        const [selectedMenu, setSelectedMenu] = useState(BidList);
        const [modalKey, setModalKey] = useState("");
        const [userInfo, setUserInfo] = useState(null); // 유저 정보를 담을 상태
        const [name, setName] = useState('')
        useEffect(() => {
            const fetchData = async () => {
                const token = localStorage.getItem('token');
                try {
                    const response = await axios.post('https://port-0-cpbeck-hdoly2altu7slne.sel5.cloudtype.app' + '/api/users/my_page', {
                        data: {
                            authorization: token
                        }
                    });
                    setUserInfo(response.data);
                    console.log(userInfo);
                    if (response.data && response.data.nick_name) {
                        setName(response.data.nick_name);
                    }
                } catch (error) {
                    console.error('Error fetching user info:', error);
                }
            };

            fetchData(); // Call the async function
        }, [name]);

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

        const closeModal = () => {
            setIsModalOpen(false);
        };

        const handleItemClick = (title, keys) => {
            // 리스트 아이템 클릭 핸들러
            setModalTitle(title); // 모달 제목 설정
            setModalKey(keys); // 셋 콘텐츠를 키값 수정으로 변경 그 외 제목 설정 모달 오픈 관련 스테이트는 남겨둠
            setIsModalOpen(true); // 모달 열기
        };

        const handleProductMenuClick = (menu) => {
            setSelectedMenu(menu);
        };

        const exp = 100;
        const ratio = parseInt(3); // parseInt((exp % 100) * 100 / 100); <-- 원본

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
                                    비드머니 0원
                                </LBoxInL>
                                <LBoxInR>
                                    <LBoxChargingBtn>
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
                            <ProductMenuItem2 onClick={() => handleProductMenuClick(BidList)}>
                                입찰중
                            </ProductMenuItem2>

                            <ProductMenuItem3 onClick={() => handleProductMenuClick(SellList)}>
                                판매중
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