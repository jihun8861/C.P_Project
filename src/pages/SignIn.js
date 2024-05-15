import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Sign from "../components/Sign";
import axios from 'axios';
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignInFrame = styled.div`
    width: 100%;
    height: auto;
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

const PwBox = styled.div`
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

const Input = styled.input`
    width: 100%;
    outline: none; // 이 녀석을 사용해야 외부 테두리가 안보임.
    border: none; //이 녀석을 사용해야 내부 테두리가 안보임.
    height: 28px;
    font-size: 16px;
    background-color: #f6f6f6;

    &::placeholder {
        color: #888896;
        &:focus-within {
            background-color: white;
        }
    }

    &:focus-within {
        background-color: white;
    }
`

const New = styled.div`
    margin: 12px 0 40px;
    font-size: 16px;
    height: 45px;
    line-height: 45px;
`

const Left = styled.div`
    float: left;
`

const Right = styled.div`
    float: right;
    margin-left: 6px;
`

const Btn = styled.button`
    min-width: 90px;
    height: 50px;
    padding: 0 20px;
    font-size: 16px;
    font-weight: 600;
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

const Bottom = styled.div`
    font-size: 16px;
    border-top: 1px solid #eee;
    position: relative;
    padding-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center; 
    text-align: center;

    h4{
        position: absolute;
        left: 50%;
        top: -13px;
        width: 68px;
        height: 16px;
        background: #fff;
        display: inline-block;
        transform: translateX(-50%);
    }
`

const Kakao = styled.button`
    width: 100%; 
    height: 50px; 
    background-color: #FEE500; 
    border: none;
    border-radius: 8px; 
    font-size: 16px;
    font-weight: bold;
    color: #000; 
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: rgb(239,218,77);
    }
`;

// 카카오 버튼 내부 컨텐츠를 감싸는 div 요소
const KakaoContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LinkStyle = {
    textDecoration: 'none',
    color: '#65997c',
    marginLeft: "7px",
    color: "#be2237"
}

const SignInContent = () => {

    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [notAllow, setNotAllow] = useState(true);
    // 아이콘 클릭으로 인한 비밀번호 보이기 여부 상태
    const [pwType, setPwType] = useState('password');
    const [showPassword, setShowPassword] = useState(false);

    const REST_API_KEY = process.env.REACT_APP_REST_API_KEY ;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  
    const loginHandler = () => {
      window.location.href = link;
    };

    const handleIdChange = (e) => {
        setId(e.target.value);
        console.log(e.target.value);
        updateButtonState(e.target.value, pw);
    };

    const handlePwChange = (e) => {
        setPw(e.target.value);
        updateButtonState(id, e.target.value);
    };

    // 아이콘 클릭 핸들러
    const handleEyeClick = () => {
        setPwType(pwType === 'password' ? 'text' : 'password');
        setShowPassword(!showPassword);
    };

    const onClickConfirmButton = async() => {
        try {
            const response = await axios.post('https://port-0-cpbeck-hdoly2altu7slne.sel5.cloudtype.app' + '/api/users/login' , {
                data: {
                    name: id,
                    password: pw
                }
            })
            localStorage.setItem("token", response.data.token);
            navigate('/');
        }
        catch (error) {
            alert('회원 정보가 일치하지 않습니다.');
        }
    }

    // 아이디와 비밀번호를 1자 이상이라도 입력 시 버튼 활성화
    const updateButtonState = (newId, newPw) => {
        setNotAllow(!(newId.length >= 1 && newPw.length >= 1));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !notAllow) {
            onClickConfirmButton();
        }
      };    

    return (
        <SignInFrame>
            <>
                <IdBox>
                    <Input
                        type="text"
                        placeholder="아이디를 입력해주세요"
                        value={id}
                        onChange={handleIdChange}
                        onKeyDown={handleKeyDown}
                    />
                </IdBox>

                <PwBox>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="암호를 입력해주세요"
                        value={pw}
                        onChange={handlePwChange}
                        onKeyDown={handleKeyDown}
                    />
                    {showPassword ? (
                        <EyeIcon onClick={handleEyeClick} />
                    ) : (
                        <EyeIcon2 onClick={handleEyeClick} />
                    )}
                </PwBox>

                <New>
                    <Left>
                        <span>신규 사용자이신가요?</span>
                        <a href="/SignUp" style={LinkStyle}>계정만들기</a>
                    </Left>
                    <Right>
                        <Btn onClick={onClickConfirmButton} disabled={notAllow}>
                            <span>로그인</span>
                        </Btn>
                    </Right>
                </New>

                <Bottom>
                    <h4>또는</h4>
                    <Kakao onClick={loginHandler}>
                        <KakaoContent>
                            <RiKakaoTalkFill style={{ width: "6%", height: "6%", marginRight: "10px" }} ></RiKakaoTalkFill>카카오톡으로 로그인
                        </KakaoContent>
                    </Kakao>
                </Bottom>
            </>
        </SignInFrame>
    );
};

const SignIn = () => {
    return <Sign props={<SignInContent />} />;
};

export default SignIn;