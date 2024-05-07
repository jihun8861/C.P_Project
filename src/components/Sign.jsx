import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import InjeIcon from './inje.svg';

const Frame = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: lightsalmon;
`

const Wrap = styled.div`
	position: relative;
	max-width: 1200px;
	height: 100%;
	margin: 0 auto;
`

const LoginIn = styled.div`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: 100%;
`

const LoginCont = styled.div`
	float: left;
	max-width: 500px;
	width: 100%;
	padding: 60px 40px 53px;
	background: #fff;
	border-radius: 20px;
	box-sizing: border-box;
`

const InjeNaraText = styled.div`
	color: #fff;
	padding-left: 102px;
	padding-top:210px;
	display: flex;

	p{
			margin:0;
			padding:0;
			font-size: 50px;
			font-weight: 600;
			margin-left: 20px;
	}
`

const LinkStyle = {
	textDecoration: "none",
	color: "white"
}

const Sign = ({ props }) => {
	return (
			<Frame>
					<Wrap>
					<LoginIn>
							<LoginCont>
									{props}
							</LoginCont>
							<InjeNaraText>
								<img src="images/BeBidIcon.png" alt="BeBidIcon" style={{marginTop:"20px" , width:"50px" , height:"80px"}}/>
										<p style={{fontSize:"80px"}}>
											<Link to="/" style={LinkStyle}>BeBid</Link>
										</p>
							</InjeNaraText>
					</LoginIn>
					</Wrap>
			</Frame>
	)
}

export default Sign;