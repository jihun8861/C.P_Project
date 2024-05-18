import React, { useState } from 'react';
import styled from "styled-components";
import Sign from "../components/Sign";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpFrame = styled.div`
	width: 100%;
	height: auto;
`

const Already = styled.div`
	margin: 0 0 14px;
	height: auto;
`

const Box = styled.div`
	width: 100%;
`

const Left = styled.div`
	float: left;
	width: 70%;
`

const Right = styled.div`
	width: 25%;
	float: right;
	margin-top:7px;
`

const IdBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 8px;
	padding: 10px;
	margin-top: 8px;
	background-color: #f6f6f6;
	border: none;
	width: 100%;
	border: 1px solid transparent;
	margin-bottom: 20px;

	&:focus-within {
			border-color: black;
			background-color: white;
	}
`

const Btn1 = styled.button`
	min-width: 90px;
	height: 50px;
	padding: 0 20px;
	font-size: 16px;
	font-weight: 500;
	border-radius: 10px;
	letter-spacing: -0.04em;
	border: 1px solid black;
	background: black;
	color: #fff;
	display: inline-block;
	box-sizing: border-box;
	text-align: center;
	transition: all 0.4s;
	cursor: pointer;

	&:disabled {
		background-color: #dadada;
		color: white;
		cursor: not-allowed;
		border: 1px;
}
`

const NameBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 8px;
	padding: 10px;
	margin-top: 8px;
	background-color: #f6f6f6;
	border: none;
	width: 100%;
	border: 1px solid transparent;
	margin-bottom: 20px;

	&:focus-within {
			border-color: black;
			background-color: white;
	}
`

const PwBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 8px;
	padding: 10px;
	margin-top: 8px;
	background-color: ${props => (props.error ? '#f6f6f6' : '#f6f6f6')};
	border: 1px solid ${props => (props.error ? '#c42237' : '#f6f6f6')};
	width: 100%;
	margin-bottom: 20px;

	&:focus-within {
			border-color: black;
			background-color: white;
	}
`

const EyeIcon = styled(FaEye)`
	position: absolute;
	left: 35%;
	cursor: pointer;
	margin-top: 5px;
	font-size: 20px;
`;

const EyeIcon2 = styled(FaEyeSlash)`
	position: absolute;
	left: 35%;
	cursor: pointer;
	margin-top: 5px;
	font-size: 20px;
`;

const ErrorMessage = styled.h3`
	color: #c42237;
	font-size: 14px;
	width: 100%;
	box-sizing: border-box;
	margin-top: -10px;
	padding-left: 5px;
	margin-bottom: 10px;
`

const SuccessMessage = styled.h3`
	color: #28a745;
	font-size: 14px;
	width: 100%;
	box-sizing: border-box;
	margin-top: -10px;
	padding-left: 5px;
	margin-bottom: 10px;
`

const PwOkBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 8px;
	padding: 10px;
	margin-top: 8px;
	background-color: #f6f6f6;
	border: none;
	width: 100%;
	border: 1px solid transparent;
	border-color: ${props => props.error ? '#c42237' : 'transparent'};
	margin-bottom: 20px;

	&:focus-within {
			border-color: black;
			background-color: white;
	}
`

const Input = styled.input`
	width: 100%;
	outline: none;
	border: none;
	height: 28px;
	font-size: 16px;
	background-color: #f6f6f6;

	&::placeholder {
			color: #888896;
	}

	&:focus-within {
			background-color: white;
	}
`

const NewBtn = styled.button`
	float: right;
	min-width: 90px;
	height: 50px;
	padding: 0 20px;
	font-size: 16px;
	font-weight: 500;
	border-radius: 90px;
	letter-spacing: -0.04em;
	background: #be2237;
	border: 1px solid rgb(141, 35, 41);
	color: #fff;
	display: inline-block;
	box-sizing: border-box;
	text-align: center;
	transition: all 0.4s;
	cursor: pointer;
	font-weight: bold;

	&:hover {
			background: rgb(165, 35, 41);
	}

	&:disabled {
			background-color: #dadada;
			color: white;
			cursor: not-allowed;
			border: 1px;
	}
`;

const LinkStyle = {
	textDecoration: 'none',
	color: '#65997c',
	marginLeft: "7px",
	color: "#be2237"
}

const SignUpContent = () => {
	const [name, setName] = useState('');
	const [id, setId] = useState('');
	const [pw, setPw] = useState('');
	const [confirmPw, setConfirmPw] = useState('');
	const [idEntered, setIdEntered] = useState(false);
	const [isDuplicateChecked, setIsDuplicateChecked] = useState(false); // 중복 확인 상태

	const [idValid, setIdValid] = useState(false);
	const [nameValid, setNameValid] = useState(false);
	const [pwValid, setPwValid] = useState(false);
	const [confirmPwValid, setConfirmPwValid] = useState(false);

	const [idError, setIdError] = useState('');
	const [idSuccess, setIdSuccess] = useState('');

	const [notAllow, setNotAllow] = useState(true);

	const [pwType, setPwType] = useState('password');

	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();

	const handleId = (e) => {
		const newId = e.target.value;
		setId(newId);
		setIdEntered(newId.length > 0);
		setIdValid(newId.length > 0);
		setIsDuplicateChecked(false); // 아이디가 변경되면 중복 확인 상태를 초기화
		setIdError('');
		setIdSuccess('');
		updateButtonState(newId, name, pw, confirmPw);
	}

	const handleName = (e) => {
		const newName = e.target.value;
		setName(newName);
		setNameValid(newName.length > 0);
		updateButtonState(id, newName, pw, confirmPw);
	}

	const handlePw = (e) => {
		const newPw = e.target.value;
		setPw(newPw);
		setPwValid(newPw.length >= 4);
		updateButtonState(id, name, newPw, confirmPw);
	};

	const handleConfirmPw = (e) => {
		const newConfirmPw = e.target.value;
		setConfirmPw(newConfirmPw);
		setConfirmPwValid(newConfirmPw === pw);
		updateButtonState(id, name, pw, newConfirmPw);
	};

	const updateButtonState = (newId, newName, newPw, newConfirmPw) => {
		setNotAllow(
			!(
				newId.length > 0 &&
				newName.length > 0 &&
				newPw.length >= 4 &&
				newPw === newConfirmPw &&
				isDuplicateChecked // 중복 확인이 완료된 상태인지 체크
			)
		);
	};

	const handleEyeClick = () => {
		setPwType(pwType === 'password' ? 'text' : 'password');
		setShowPassword(!showPassword);
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && !notAllow) {
			onClickSignUpBtn();
		}
	};

	const onClickSignUpBtn = () => {
		if (!notAllow) {
			alert('회원가입에 성공했습니다.');
			axios.post('https://port-0-cpbeck-hdoly2altu7slne.sel5.cloudtype.app' + '/api/users/create', {
				data: {
					name: id,
					password: pw,
					nick_name: name
				}
			})
			navigate('/SignIn')
		} else {
			alert('회원가입 정보를 올바르게 입력해주세요.');
		}
	};

	const idCheck = async () => {
		try {
			const response = await axios.post('https://port-0-cpbeck-hdoly2altu7slne.sel5.cloudtype.app' + '/api/users/check_duplicate', {
				data: {
					id: 0,
					name: id,
					nick_name: "string",
					authorization: "string"
				}
			});
	
			if (response.data == null) {
				setIdError('');
				setIdSuccess('사용 가능한 아이디입니다.');
				setIsDuplicateChecked(true);
				updateButtonState(id, name, pw, confirmPw);
				console.log("성공");
			} else {
				setIdError('이미 사용중인 아이디입니다.');
				setIdSuccess('');
				setIsDuplicateChecked(false);
				console.log("실패");
			}
		} catch (error) {
			setIdError('');
			setIdSuccess('사용 가능한 아이디입니다.');
			setIsDuplicateChecked(true);
			updateButtonState(id, name, pw, confirmPw);
			console.log("서버 오류 발생");
		}
	};

	return (
		<SignUpFrame>
			<>
				<Already>
					<span>이미 계정이 있으신가요?</span>
					<a href="/SignIn" style={LinkStyle}>로그인</a>
				</Already>

				<Box>
					<Left>
						<IdBox>
							<Input
								type="text"
								placeholder="아이디를 입력해주세요"
								value={id}
								onChange={handleId}
								onKeyDown={handleKeyDown}
							/>
							{idError && <ErrorMessage>{idError}</ErrorMessage>}
							{idSuccess && <SuccessMessage>{idSuccess}</SuccessMessage>}
						</IdBox>
					</Left>

					<Right>
						<Btn1 onClick={idCheck} disabled={!idEntered}>
							<span>중복확인</span>
						</Btn1>
					</Right>
				</Box>

				<NameBox>
					<Input
						type="text"
						placeholder="사용자 이름을 입력해주세요"
						value={name}
						onChange={handleName}
						onKeyDown={handleKeyDown}
					/>
				</NameBox>

				<PwBox>
					<Input
						type={showPassword ? 'text' : 'password'}
						placeholder="암호를 입력해주세요"
						value={pw}
						onChange={handlePw}
						onKeyDown={handleKeyDown}
					/>
					{showPassword ? (
						<EyeIcon onClick={handleEyeClick} />
					) : (
						<EyeIcon2 onClick={handleEyeClick} />
					)}
				</PwBox>
				{!pwValid && pw.length > 0 && <ErrorMessage>비밀번호는 4자 이상이여야 합니다.</ErrorMessage>}

				<PwOkBox>
					<Input
						type="password"
						placeholder="암호를 다시 한번 입력해주세요"
						value={confirmPw}
						onChange={handleConfirmPw}
						onKeyDown={handleKeyDown}
					/>
				</PwOkBox>
				{!confirmPwValid && confirmPw.length > 0 && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}

				<NewBtn onClick={onClickSignUpBtn} disabled={notAllow}>
					<span>계정만들기</span>
				</NewBtn>
			</>
		</SignUpFrame>
	);
};

const SignUp = () => {
	return <Sign props={<SignUpContent />} />;
};

export default SignUp;