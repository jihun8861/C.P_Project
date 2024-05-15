import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import styled, { keyframes } from "styled-components";
import { FaHeart } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import ReactApexCharts from 'react-apexcharts';
import { MdOutlineAccessTime } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

const slideInRight = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Container = styled.div`
    width: 90%;
    height: auto;
`;

const Explain = styled.div`
    width: 55%;
    height: 10%;
    margin-top: 10px;
    padding: 40px 0px 40px 0px;
`;

const TitleLine = styled.hr`
    width: 100%;
    background: black;
    height: 1px;
    border: 0;
    margin-bottom: 50px;
`;

const ItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 500px;
`;

const ImageFrame = styled.div`
    width: 45%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 1px;
`;

const TextFrame = styled.div`
    width: 55%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px 20px 0px 20px;
`;

const Header = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
`;

const PriceText = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Price = styled.div`
    width: 40%;
    height: 100%;
    color: #114da5;
    font-size: 30px;
    font-weight: 600;
`;

const RemainTime = styled.div`
    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #114da5;
    border: none;
    color: white;
`;

const TimeIcon = styled(MdOutlineAccessTime)`
  font-size: 20px;
  margin-right: 5px;
`;

const Line = styled.hr`
    width: 100%;
    margin-top: 20px;
    padding-right: 20px;
    background: #efefef;
    height: 1px;
    border: 0;
`;

const InfoBox = styled.div`
    width: 100%;
    height: 10%;
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    ul{
        display: flex;
        align-items: center;
        font-weight: bold;
        color: #c0c0c0;
        margin-right: 20px;
    }
`;

const HeartIcon = styled(FaHeart)`
    font-size: 20px;
    color: #c0c0c0;
    margin-right: 10px;
`;

const EyeIcon = styled(FaEye)`
    font-size: 20px;
    color: #c0c0c0;
    margin-right: 10px;
`;

const CateIcon = styled(BiSolidCategoryAlt)`
    font-size: 20px;
    color: #c0c0c0;
    margin-right: 10px;
`;

const StatusBox = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: row;
    margin-top: 10px;
`;

const Status = styled.div`
    width: 20%;
    height: 100%;
    color: #c0c0c0;
    h3{
        padding-top: 5px;
    }
`;

const StatusText = styled.div`
    width: 85%;
    height: 100%;
    h3{
        padding-top: 5px;
    }
`;

const BtnSpace = styled.div`
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: row;
    align-items: end;
`;

const HeartBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33%;
    height: 70%;
    cursor: pointer;
    background-color: #cccccc;
    color: white;
    border: none;
    font-size: 12px;
    p{
        margin-left: 5px;
        font-size: 18px;
        font-weight: bold;
        margin-top: 1px;
    }
`;

const Heart = styled(FaHeart)`
    font-size: 20px;
    margin-right: 5px;
`;

const Btn = styled.button`
    width: 33%;
    height: 70%;
    margin-left: 20px;
    cursor: pointer;
    background-color: #ffa425;
    color: white;
    border: none;
    font-size: 12px;
`;

const BuyBtn = styled.button`
    width: 33%;
    height: 70%;
    margin-left: 20px;
    cursor: pointer;
    background-color: #f70000;
    color: white;
    border: none;
    font-size: 12px;
`;

const GraphContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 450px;
`;

// 여기부터 모달 디자인
const ModalLayout = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 10001;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    overflow: hidden;
`;

const ModalContent = styled.div`
    background-color: #ffffff;
    width: 40%;
    height: 90%;
    display: flex;
    justify-content: center;
    flex-direction: column;

    /* 모달이 열릴 때 애니메이션을 적용 */
    animation: ${slideInRight} 0.3s ease-in-out; /* 애니메이션의 지속 시간을 조절 */
`;

const ModalHeader = styled.div`
    width: 100%;
    height: 8%;
    background: #114da5;
    padding: 10px;
    display: flex;
    align-items: center;
    font-weight: bold;
`

const ModalTitle = styled.div`
    width: 95%;
    height: 100%;
    color: white;
    font-size: 20px;
    display: flex;
    align-items: center;
`

const ModalCloseBtn = styled(IoCloseOutline )`
    width: 5%;
    height: 100%;
    background-color: #114da5;
    color: white;
    cursor: pointer;
`

const ModalMain = styled.div`
    width: 100%;
    height: 92%;
    padding: 40px;
`

const MainTitle = styled.div`
    width: 100%;
    height: 10%;
    border: solid 1px;
    font-size: 24px;
    font-weight: bold;
    display: flex;
    align-items: center;
`


const BidContent = () => {
    const [totalHeartCount, setTotalHeartCount] = useState(0);
    const [heartCount, setHeartCount] = useState(0);
    const [isClicked, setIsClicked] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Sample data for the chart
    const [chartData, setChartData] = useState({
        series: [{
            name: 'Series 1',
            data: [31, 40, 45, 51, 58, 109, 120]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'Sample Chart',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            }
        },
    });

    // 상품 등록 시간과 종료 시간 설정 (예시)
    const startDate = new Date('2024-05-23T02:04:53'); // 등록 시간
    const endDate = new Date('2024-05-24T02:04:53'); // 종료 시간

    // 남은 시간 계산
    const calculateRemainingTime = () => {
        const now = new Date();
        const timeDifference = endDate - now;
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        return `${hours}시간 ${minutes}분 ${seconds}초`;
    };

    // 1초마다 남은 시간 갱신
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // 찜 버튼 클릭 이벤트 핸들러
    const handleHeartClick = () => {
        // 클릭 상태 변경
        setIsClicked(!isClicked);
        // 클릭되었을 때만 총 하트 수와 개별 하트 수 증가 혹은 감소
        if (!isClicked) {
            setTotalHeartCount(totalHeartCount + 1);
            setHeartCount(heartCount + 1);
        } else {
            setTotalHeartCount(totalHeartCount - 1);
            setHeartCount(heartCount - 1);
        }
    };

    const handleModalOpen = () => {
        document.body.style.overflow = 'hidden';
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        document.body.style.overflow = 'auto';
        setIsModalOpen(false);
    };

    return (
        <>
            <Container>
                <Explain>
                    <h1> 0세대 해적왕 골드 D 로저의 칼</h1>
                </Explain>

                <TitleLine />

                <ItemContainer>
                    <ImageFrame>
                        <h1>이미지</h1>
                    </ImageFrame>

                    <TextFrame>
                        <Header>
                            <PriceText>
                                <h2>현재가</h2>
                            </PriceText>

                            <Price>
                                <p>1,000,000원</p>
                            </Price>

                            <RemainTime>
                                <TimeIcon />
                                <p>남은시간 {calculateRemainingTime()}</p>
                            </RemainTime>

                        </Header>

                        <Line />

                        <InfoBox>
                            <ul>
                                <HeartIcon /> <p>{heartCount}</p>
                            </ul>

                            <ul>
                                <EyeIcon /> <p>205</p>
                            </ul>

                            <ul>
                                <CateIcon /> <p>해적</p>
                            </ul>

                        </InfoBox>

                        <StatusBox>
                            <Status>
                                <h3>· 상품상태</h3>
                                <h3>· 경매기간</h3>
                                <h3>· 판매자 ID</h3>
                                <h3>· 시작가</h3>
                            </Status>

                            <StatusText>
                                <h3>존나 낡았음</h3>
                                <h3>{startDate.toLocaleString()} ~ {endDate.toLocaleString()}</h3>
                                <h3>골드 D 루피</h3>
                                <h3>25,000원</h3>
                            </StatusText>
                        </StatusBox>

                        <BtnSpace>
                            <HeartBtn onClick={handleHeartClick} style={{ backgroundColor: isClicked ? 'black' : '#cccccc' }}>
                                <Heart style={{ color: isClicked ? 'red' : '#ffffff' }} />
                                <h2>찜</h2>
                                <p>{heartCount}</p>
                            </HeartBtn>

                            <Btn><h2>문의하기</h2></Btn>
                            {isModalOpen && (
                                <ModalLayout onClick={handleModalClose}>
                                    <ModalContent onClick={(e) => e.stopPropagation()}>

                                        <ModalHeader>
                                            <ModalTitle>입찰하기</ModalTitle>
                                            <ModalCloseBtn onClick={handleModalClose}>닫기</ModalCloseBtn>
                                        </ModalHeader>


                                        <ModalMain>
                                            <MainTitle>0세대 해적왕 골드 D 로저의 칼</MainTitle>
                                        </ModalMain>

                                    </ModalContent>
                                </ModalLayout>
                            )}
                            <BuyBtn onClick={handleModalOpen}><h2>입찰하기</h2></BuyBtn>

                        </BtnSpace>

                    </TextFrame>
                </ItemContainer>

                <GraphContainer>
                    <ReactApexCharts
                        options={chartData.options}
                        series={chartData.series}
                        type="line"
                        height={350}
                        width={1000}
                    />
                </GraphContainer>

            </Container>
        </>
    )
};

const Bid = () => {
    return <Layout props={<BidContent />} />
};

export default Bid;
