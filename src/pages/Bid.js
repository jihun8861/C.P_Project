// 서드파티 라이브러리
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import ReactApexCharts from 'react-apexcharts';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import axios from "axios";

// 서드파티 아이콘 라이브러리
import { FaHeart } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { MdAccessTimeFilled } from "react-icons/md";

// 절대 경로 모듈 (프로젝트 내부의 특정 위치에서 가져오는 모듈)
import Layout from "../components/Layout";
import styled, { keyframes } from "styled-components";
// 현지훈 바보
const slideInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const slideOutAnimation = keyframes`
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
    width: 100%;
    height: 10%;
    margin-top: 10px;
    padding: 20px 0px 20px 0px;
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
    border: solid 1px #eeeeee;
    img{
        width: 510px;
        height: 495px;
    }
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
  justify-content: space-between;
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
    width: 35%;
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
    background: #cecece;
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
        font-size: 18px;
    }
`;

const HeartIcon = styled(FaHeart)`
    font-size: 24px;
    color: #c0c0c0;
    margin-right: 10px;
`;

const EyeIcon = styled(FaEye)`
    font-size: 24px;
    color: #c0c0c0;
    margin-right: 10px;
`;

const LastIcon = styled(MdAccessTimeFilled)`
    font-size: 24px;
    color: #c0c0c0;
    margin-right: 10px;
`;

const StatusBox = styled.div`
    width: 609px;
    height: 50%;
    display: flex;
    flex-direction: row;
    margin-top: 20px;
`;

const ExplainBox = styled.div`
    width: 100%;
    height: 50%;
    border: 1px solid black;
    display: flex;
    margin-top: 20px;
    overflow-y: scroll;
`;

const Status = styled.div`
    width: 20%;
    height: 100%;
    color: #c0c0c0;
    h3{
        padding-top: 15px;
    }
`;

const StatusText = styled.div`
    width: 85%;
    height: 100%;
    h3{
        padding-top: 15px;
    }
    overflow-y: scroll;
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
    z-index: 11;
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
    width: 43%;
    height: 90%;
    display: flex;
    justify-content: center;
    flex-direction: column;

    /* 모달이 열릴 때 애니메이션을 적용 */
    animation: ${slideInAnimation} 0.4s ease-in-out; /* 애니메이션의 지속 시간을 조절 */

    &.closing {
        animation: ${slideOutAnimation} 0.3s ease-in-out; /* 닫힐 때 애니메이션 */
    }
`;

const ModalHeader = styled.div`
    width: 100%;
    height: 8%;
    background: lightsalmon;
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

const ModalCloseBtn = styled(IoCloseOutline)`
    width: 5%;
    height: 100%;
    background-color: lightsalmon;
    color: white;
    cursor: pointer;
`

const ModalFrame = styled.div`
    width: 100%;
    height: 92%;
    padding: 40px;
    display: flex;
    flex-direction: column;
`

const MainTitle = styled.div`
    width: 100%;
    height: 10%;
    border-bottom: solid 1px;
    font-size: 24px;
    font-weight: bold;
    display: flex;
    align-items: center;
    color: #4d4d4d;
`

const ModalMain = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 10%;
`

const ModalMainLeft = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f3f3f3;
    width: 25%;
    border-right: solid 1px #cecece;
    border-bottom: solid 1px #cecece;
`

const ModalMainRight = styled.div`
    display: flex;
    align-items: center;
    width: 75%;
    border-bottom: solid 1px #cecece;
    padding-left: 20px;
`

const ModalRemainTime = styled.div`
    width: 33%;
    height: 75%;
    background-color: #114da5;
    margin-left: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 17px;
`

const ModalTextBox = styled.input`
    width: 20%;
    height: 60%;
    font-size: 18px;
    padding-left: 5px;
    align-items: center;

    &:focus {
        outline: none;
        border: 2px solid #66afe9;
        box-shadow: 0 0 5px #66afe9;
    }
`;

const ModalBtnSpace = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`

const ModalBidBtn = styled.button`
    width: 15%;
    height: 70%;
    background-color: #114da5;
    color: white;
    border: none;
    margin-right: 10px;
    cursor: pointer;
    font-size:16px;

    &:active {
        box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3);
    }
`

const ModalCancelBtn = styled.button`
    width: 10%;
    height: 70%;
    border: solid 1px #e1e1e1;
    margin-left: 10px;
    cursor: pointer;
    font-size:16px;

    &:active { //버튼의 클릭감을 보이게 하기 위한 CSS
        box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3);
    }
`

const ModalBottom = styled.div`
    width: 100%;
    height: 37%;
    padding: 20px;

    span{
        font-weight: bold;
    }
`

const BidContent = () => {
    const location = useLocation();
    const userInfo = { ...location.state };
    const timeDifference = userInfo.timeDifference;
    const navigate = useNavigate();

    const [totalHeartCount, setTotalHeartCount] = useState(0);
    const [heartCount, setHeartCount] = useState(0);
    const [isClicked, setIsClicked] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bidAmount, setBidAmount] = useState(userInfo.data.startprice);
    const [inputBidAmount, setInputBidAmount] = useState(bidAmount + 1000);
    const startTime = new Date(userInfo.data.start_time);
    const token = localStorage.getItem('token');
    startTime.setHours(startTime.getHours() + 9);

    const formattedStartTime = format(startTime, 'yyyy/MM/dd HH:mm');

    const endDate = new Date(startTime.getTime() + 1 * 24 * 60 * 60 * 1000); //(startTime.getTime() + 1 * 24 * 60 * 60 * 1000);
    const formattedEndTime = format(endDate, 'yyyy/MM/dd HH:mm');

    const [bidList, setBidList] = useState([20,30]);

    // 임시 그래프 차트 데이터
    const [chartData, setChartData] = useState({
        series: [{
            name: 'Bid Prices',
            data: bidList, // bidList를 그래프 데이터로 사용
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
                text: 'Bid Prices Over Time',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['1', '2', '3', '4', '5', '6', '7'], // 일주일치 데이터 예시
            }
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.post("https://port-0-cpbeck-hdoly2altu7slne.sel5.cloudtype.app/api/users/is_liked", {
                    "data": {
                        "authorization": token,
                        "content_id": userInfo.data.id
                    }
                });
                console.log(response.data);
                if (response.data === true) {
                    setIsClicked(true);
                    setHeartCount(prevCount => prevCount + 1); // 현재 좋아요 수를 업데이트
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [userInfo.data.id]);

    // 남은 시간 계산 함수
    const calculateRemainingTime = () => {
        const now = new Date();
        const timeDifference = endDate - now;
        if (timeDifference <= 0) {
            //alert("낙찰 되셨습니다! 축하드립니다");
            return { 
                isEnded: true, 
                timeString: "입찰종료" 
            };
        }
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        return { isEnded: false, timeString: `${days}일 ${hours}시간 ${minutes}분 ${seconds}초` };
    };

    const remainingTime = calculateRemainingTime();

    const handleModalOpen = () => {
        if (token) {
            document.body.style.overflow = 'hidden';
            setInputBidAmount(userInfo.data.startprice + 1000);
            setIsModalOpen(true);
        } else {
            alert('로그인을 해주세요');
            navigate('/SignIn');
        }
    };

    const handleModalClose = () => {
        document.body.style.overflow = 'auto';
        setIsModalOpen(false);
    };

    const handleModalConfirm = async () => {
        if (inputBidAmount < userInfo.data.startprice + 1000) {
            Swal.fire({
                icon: 'error',
                title: '입찰 금액 오류',
                text: `입찰 가능 금액(${formatNumber(userInfo.data.startprice + 1000)} 원)보다 적은 금액을 입력하셨습니다.`,
                confirmButtonText: '확인'
            });
            return;
        }
        Swal.fire({
            title: `${formatNumber(inputBidAmount)} 원의 금액에 입찰하시겠습니까?`,
            text: "신중하게 생각하신 후에 입찰하세요! 입찰하신 금액은 취소하실 수 없습니다.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '입찰하기',
            cancelButtonText: '취소'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.post('https://port-0-cpbeck-hdoly2altu7slne.sel5.cloudtype.app/api/bid', {
                        "data": {
                            "authorization": token,
                            "item_title": userInfo.data.title,
                            "bid_amount": inputBidAmount
                        }
                    });

                    if (response.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: '입찰 완료',
                            text: `${formatNumber(inputBidAmount)}원의 금액에 입찰이 완료되었습니다!`,
                            confirmButtonText: '확인'
                        });
                        handleModalClose();
                        setBidAmount(inputBidAmount);
                        userInfo.data.startprice = inputBidAmount; // 업데이트된 현재가를 userInfo에 반영
                        setBidList([...bidList, inputBidAmount]); // 새로운 입찰 금액을 bidList에 추가
                        console.log(bidList);
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: '입찰 실패',
                        text: '입찰 중 오류가 발생했습니다. 다시 시도해주세요.',
                        confirmButtonText: '확인'
                    });
                }
            }
        });
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat('ko-KR').format(number);
    };

    const handleHeartClick = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('https://port-0-cpbeck-hdoly2altu7slne.sel5.cloudtype.app/api/users/toggle_like', {
                "data": {
                    "authorization": token,
                    "content_id": userInfo.data.id
                }
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }

        if (token) {
            setIsClicked(!isClicked);
            if (!isClicked) {
                setTotalHeartCount(totalHeartCount + 1);
                setHeartCount(heartCount + 1);
            } else {
                setTotalHeartCount(totalHeartCount - 1);
                setHeartCount(heartCount - 1);
            }
        } else {
            alert('로그인을 해주세요');
            navigate('/SignIn');
        }
    };

    const handleSupportClick = () => {
        if (token) {
            return (
                alert('고객지원으로 이동됨'),
                navigate('/CustomerSupport')
            );
        } else {
            return (
                alert('로그인을 해주세요'),
                navigate('/SignIn')
            );
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const hits = async () => {
            try {
                await axios.post('https://port-0-cpbeck-hdoly2altu7slne.sel5.cloudtype.app/api/users/increase_view_count', {
                    data: {
                        "content_id": userInfo.data.id
                    }
                });
            } catch (error) {
                console.log("실패");
            }
        };
        hits();
    }, [userInfo.data.id]);

    const API_KEY = 'AIzaSyAxAqJYZSKbF7pm5XHril-dndv4HdVrbz4';
    const DRIVE_FOLDER_ID = '1-1w_h8t3ICtJRC57iUuTG-Mwy5sUFXJQ';
    const FILE_NAME = userInfo.data.picture;
    const [nowItem, setNowItem] = useState('');

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`https://www.googleapis.com/drive/v3/files?q=name='${FILE_NAME}' and '${DRIVE_FOLDER_ID}' in parents&fields=files(id,name,thumbnailLink)`, {
                    params: {
                        key: API_KEY,
                        pageSize: 1
                    }
                });
                setNowItem(response.data.files[0].thumbnailLink);
            } catch (error) {
                console.log('gderror', error);
            }
        };

        fetchImages();
    }, []);
    
    return (
        <>
            <Container>
                <Explain>
                    <h1>{userInfo.data.title}</h1>
                </Explain>

                <TitleLine />

                <ItemContainer>
                    <ImageFrame>
                        <img src={nowItem}></img>
                    </ImageFrame>

                    <TextFrame>
                        <Header>
                            <PriceText>
                                <h2>현재가</h2>
                            </PriceText>

                            <Price style={{marginRight:"30px"}}>
                                <p>{formatNumber(bidAmount)}원</p>
                            </Price>

                            <RemainTime>
                                {!remainingTime.isEnded && <TimeIcon />}
                                <p>{remainingTime.timeString}</p>
                            </RemainTime>
                        </Header>

                        <Line />

                        <InfoBox>
                            <ul>
                                <HeartIcon /> <p>{heartCount}</p>
                            </ul>

                            <ul>
                                <EyeIcon /> <p>{userInfo.data.view_count}</p>
                            </ul>

                            <ul>
                                <LastIcon /> <p>{timeDifference}</p>
                            </ul>

                        </InfoBox>

                        <StatusBox>
                            <Status>
                                <h3>· 경매기간</h3>
                                <h3>· 판매자 ID</h3>
                                <h3>· 시작가</h3>
                                <h3>· 상품설명</h3>
                            </Status>

                            <StatusText>
                                <h3>{formattedStartTime} ~ {formattedEndTime}</h3>
                                <h3>{userInfo.data.userid}</h3>
                                <h3>{formatNumber(userInfo.data.startprice)}원</h3>
                                <h3>{userInfo.data.text}</h3>
                            </StatusText>
                        </StatusBox>

                        <BtnSpace>
                            <HeartBtn onClick={handleHeartClick} style={{ backgroundColor: isClicked ? 'black' : '#cccccc' }}>
                                <Heart style={{ color: isClicked ? 'red' : '#ffffff' }} />
                                <h2>찜</h2>
                                <p>{heartCount}</p>
                            </HeartBtn>

                            <Btn onClick={handleSupportClick}><h2>문의하기</h2></Btn>
                            {isModalOpen && (
                                <ModalLayout onClick={handleModalClose}>
                                    <ModalContent onClick={(e) => e.stopPropagation()}>

                                        <ModalHeader>
                                            <ModalTitle>입찰하기</ModalTitle>
                                            <ModalCloseBtn onClick={handleModalClose}>닫기</ModalCloseBtn>
                                        </ModalHeader>

                                        <ModalFrame>
                                            <MainTitle>{userInfo.data.title}</MainTitle>
                                            <ModalMain>
                                                <ModalMainLeft><h3>판매자</h3></ModalMainLeft>
                                                <ModalMainRight><span>{userInfo.data.userid}</span></ModalMainRight>
                                            </ModalMain>

                                            <ModalMain>
                                                <ModalMainLeft><h3>시작가</h3></ModalMainLeft>
                                                <ModalMainRight><span>{formatNumber(userInfo.data.startprice)} 원</span></ModalMainRight>
                                            </ModalMain>

                                            <ModalMain>
                                                <ModalMainLeft><h3>남은시간</h3></ModalMainLeft>
                                                <ModalMainRight>
                                                    {remainingTime.isEnded
                                                        ? <span>입찰종료</span>
                                                        : <>
                                                            <span>{formattedEndTime}까지</span>
                                                            <ModalRemainTime>
                                                                {remainingTime.timeString}
                                                            </ModalRemainTime>
                                                        </>
                                                    }
                                                </ModalMainRight>
                                            </ModalMain>

                                            <ModalMain>
                                                <ModalMainLeft><h3>입찰단위</h3></ModalMainLeft>
                                                <ModalMainRight><span>1,000원</span></ModalMainRight>
                                            </ModalMain>

                                            <ModalMain>
                                                <ModalMainLeft><h3>현재가</h3></ModalMainLeft>
                                                <ModalMainRight style={{ color: '#114da5', fontWeight: 'bold' }}><h3>{formatNumber(bidAmount)}원</h3></ModalMainRight>
                                            </ModalMain>

                                            <ModalMain>
                                                <ModalMainLeft><h3>입찰금액</h3></ModalMainLeft>
                                                <ModalMainRight style={{ color: '#114da5', fontWeight: 'bold' }} >
                                                    <ModalTextBox type="number"
                                                        value={inputBidAmount}
                                                        onChange={(e) => setInputBidAmount(parseInt(e.target.value) || 0)} />
                                                    <span style={{ marginLeft: '7px', fontSize: '18px' }}>{formatNumber(inputBidAmount)} 원</span>
                                                </ModalMainRight>
                                            </ModalMain>

                                            <ModalMain>
                                                <ModalMainLeft><h3>거래횟수</h3></ModalMainLeft>
                                                <ModalMainRight>4회 (판매: 1회, 구매: 3회)</ModalMainRight>
                                            </ModalMain>

                                            <ModalBtnSpace>
                                                <ModalBidBtn onClick={handleModalConfirm}>입찰하기</ModalBidBtn>
                                                <ModalCancelBtn onClick={handleModalClose}>취소</ModalCancelBtn>
                                            </ModalBtnSpace>

                                            <Line style={{ marginTop: '10px' }} />

                                            <ModalBottom>
                                                <h3>* 알려드립니다.</h3><br />
                                                <span>입찰 실수 및 허위입찰</span>은 경매사고로 이어질 수 있으며, <span>미정산(미입금, 구매거부 등) 누적시</span> 비비드 이용
                                                제한이 발생될 수 있습니다.<br /><br />
                                                비비드에 등록된 판매물품의 내용 및 판매진행은 <span>판매자의 전적인 책임</span>으로 이루어지며, 거래 및 결제와 관련된
                                                모든 책임은 판매자와 구매자에게 있습니다.
                                            </ModalBottom>
                                            <Line style={{ marginTop: '10px' }} />

                                        </ModalFrame>

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
                        width={1270}
                    />
                </GraphContainer>

            </Container>
        </>
    );
};

const Bid = () => {
    return <Layout props={<BidContent />} />;
};

export default Bid;