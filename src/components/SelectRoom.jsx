import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
	width: 500px;
	height: 600px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	border: 1px solid gray;
	background-color: lightgray;
	position: absolute;
	z-index: 100;
	h1 {
		margin-top: 20px;
	}
`;

const SmallBox = styled.div`
	width: 100%;
	height: 10%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 20px;
`;

const LeftSight = styled.div`
	width: 50%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const RightSight = styled.div`
	width: 50%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const StyledButton = styled.button`
	width: 100px;
	height: auto;
	font-size: 20px;
	margin-left: 30px;
	cursor: pointer;
	border-radius: 10px;
	background-color: salmon;
`;

const SelectRoom = () => {
	const navigate = useNavigate();

	const enterChat = () => {
		navigate('/chat');
	}

	return (
		<Container>
			<h1>로비 선택</h1>
			<SmallBox>
				<LeftSight>
					<h2>자유 토론방</h2>
				</LeftSight>
				<RightSight>
					<StyledButton onClick={enterChat}>입장</StyledButton>
				</RightSight>
			</SmallBox>
			<SmallBox>
				<LeftSight>
					<h2>운영자와의 대화</h2>
				</LeftSight>
				<RightSight>
					<StyledButton onClick={enterChat}>입장</StyledButton>
				</RightSight>
			</SmallBox>
			<SmallBox>
				<LeftSight>
					<h2>팬이에요 소통해요</h2>
				</LeftSight>
				<RightSight>
					<StyledButton onClick={enterChat}	>입장</StyledButton>
				</RightSight>
			</SmallBox>
			<StyledButton style={{ width: "150px", height: "40px", marginTop: "50px" }}>닫기</StyledButton>
		</Container>
	)
}

export default SelectRoom;