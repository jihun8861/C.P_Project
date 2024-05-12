import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import { FaHeart } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import ReactApexCharts from 'react-apexcharts';


const Container = styled.div`
    width: 90%;
    height: 100vh;
    margin-top: 60px;
`

const ItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    border: solid 1px;
    width: 100%;
    height: 50%;
`

const ImageFrame = styled.div`
    width: 45%;
    height: 100%;
    border: solid 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: lightblue;
`

const TextFrame = styled.div`
    width: 55%;
    height: 100%;
    border: solid 1px;
    display: flex;
    flex-direction: column;
    padding: 20px 20px 0px 20px;
`

const Title = styled.div`
    width:100%;
    height: 10%;
    display: flex;
    margin-bottom: 20px;
    font-size: 14px;
`

const Price = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    font-size: 18px;
`

const Line = styled.hr`
    width: 100%;
    margin-top: 20px;
    padding-right: 20px;
    background: #efefef;
    height: 1px;
    border: 0;
`

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
`

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
    height: 20%;
    display: flex;
    flex-direction: row;
    margin-top: 10px;
`

const Status = styled.div`
    width: 15%;
    height: 100%;
    color: #c0c0c0;
    h4{
        padding-top: 5px;
    }
`

const StatusText = styled.div`
    width: 85%;
    height: 100%;
    h4{
        padding-top: 5px;
    }
`

const Explain = styled.div`
    width: 100%;
    height: 10%;
    margin-top: 10px;
`

const BtnSpace = styled.div`
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`

const HeartBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 80%;
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
`

const Heart = styled(FaHeart)`
    font-size: 20px;
    margin-right: 5px;
`

const Btn = styled.button`
    width: 30%;
    height: 80%;
    margin-left: 20px;
    cursor: pointer;
    background-color: #ffa425;
    color: white;
    border: none;
    font-size: 12px;
`

const BuyBtn = styled.button`
    width: 30%;
    height: 80%;
    margin-left: 20px;
    cursor: pointer;
    background-color: #f70000;
    color: white;
    border: none;
    font-size: 12px;
`

const GraphContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50%;
    background-color: lightsalmon;
    border: solid 1px;
`

const BidContent = () => {
    const [totalHeartCount, setTotalHeartCount] = useState(0);
    const [heartCount, setHeartCount] = useState(0);
    const [isClicked, setIsClicked] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Sample data for the chart
    const [chartData, setChartData] = useState({
        series: [{
            name: 'Series 1',
            data: [31, 40, 28, 51, 42, 109, 100]
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

    // 낙찰 종료 시간 계산
    const endDate = new Date(currentTime);
    endDate.setHours(endDate.getHours() + 24); // 예시로 현재 시간부터 24시간 이후로 설정합니다.

    // 1초마다 현재 시간 갱신
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, [currentTime]);

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

    return (
        <>
            <Container>
                <ItemContainer>
                    <ImageFrame>
                        <h1>이미지</h1>
                    </ImageFrame>

                    <TextFrame>
                        <Title>
                            <h1>골드 D 로저의 낡은 검</h1>
                        </Title>
                        <Price>
                            <h1>1,000,000원</h1>
                        </Price>

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
                                <h4>· 상품상태</h4>
                                <h4>· 낙찰종료</h4>
                            </Status>

                            <StatusText>
                                <h4>존나 낡았음</h4>
                                <h4>{endDate.toLocaleString()}</h4>
                            </StatusText>
                        </StatusBox>

                        <Explain>
                            <h3>이 검은 0세대 제왕 골드 D 로저의 칼이다.</h3>
                        </Explain>

                        <BtnSpace>
                            <HeartBtn onClick={handleHeartClick} style={{ backgroundColor: isClicked ? 'black' : '#cccccc' }}>
                                <Heart style={{ color: isClicked ? 'red' : '#ffffff' }} />
                                <h2>찜</h2>
                                <p>{heartCount}</p>
                            </HeartBtn>

                            <Btn><h2>임시 버튼</h2></Btn>
                            <BuyBtn><h2>구매</h2></BuyBtn>
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
}

const Bid = () => {
    return <Layout props={<BidContent />} />
}

export default Bid;
