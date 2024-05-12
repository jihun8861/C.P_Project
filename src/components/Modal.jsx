import React from "react";
import styled, { keyframes } from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { FaCircleCheck } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosLock } from "react-icons/io";
import axios from "axios";

// 모달이 열릴 때 애니메이션을 정의합니다.
const slideInRight = keyframes`
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0);
    }
`;

const ModalLayout = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 10001;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    overflow: hidden;
`;

const ModalContent = styled.div`
    background-color: #ffffff;
    position: absolute;
    top: 0;
    right: 0;
    width: 35%;
    height: 100%;
    padding: 15px;

    /* 모달이 열릴 때 애니메이션을 적용 */
    animation: ${slideInRight} 0.3s ease-in-out; /* 애니메이션의 지속 시간을 조절 */
`;

const ModalHeader = styled.div`
    width: 100%;
    height: 7%;
    display: flex;
    align-items: center;
`;

const ModalHeaderL = styled.div`
    width: 10%;
    height: 100%;
    display: flex;
    align-items: center;
`;

const ModalHeaderR = styled.h3`
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContainer = styled.div`
    width: 100%;
    background: rgb(255, 255, 255);
    padding-top: 0px;
    height: 100%;
    display: flex;
`;

const BackIcon = styled(IoIosArrowBack)`
    font-size: 30px;
    cursor: pointer;
`;

// 여기부터 모달 디자인

// 모달1 디자인
const ModalMain = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 93%;
    padding: 15px;
  `

const Modal1Header = styled.div`
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `

const Modal1Ig = styled.div`
    display: flex;
    width: 18%;
    height: 70%;
    background-image: url("images/Lock.png");
    background-size: 100% 100%;
  `

const Modal1Name = styled.h3`
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `

const Modal1Main = styled.div`
    width: 100%;
    height: 70%;
    padding: 10px;
  `

const Modal1Text = styled.h2`
    width: 100%;
    height: 10%;
    margin-top: 20px;
  `

const Modal1Current = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  padding: 10px;
  margin-top: 8px;
  background-color: #f6f6f6;
  border: 1px solid lightsalmon;
  width: 100%;
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
  border: 1px solid lightsalmon;
  width: 100%;
  margin-bottom: 20px;

  &:focus-within {
      border-color: black;
      background-color: white;
  }
`

const ErrorMessage = styled.h3`
  position: absolute;
  color: red;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  margin-top: -12px;
  padding-left: 5px;
`

const PwOkBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  padding: 10px;
  margin-top: 8px;
  background-color: #f6f6f6;
  border: 1px solid lightsalmon;
  width: 100%;
  margin-bottom: 20px;

  &:focus-within {
      border-color: black;
      background-color: white;
  }
`

const Input = styled.input`
  width: 100%;
  outline: none; // 이 녀석을 사용해야 외부 테두리가 안보임.
  border: none; //이 녀석을 사용해야 내부 테두리가 안보임.
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

const Modal1Text2 = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: bold;
  margin-top: 50px;
`

const Modal1PwChangeBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  width: 100%;
  height: 10%;
  padding: 10px;
  border-radius: 20px;
  color: white;
  font-size: 24px;
  font-weight: bold;
  border: none;
  cursor: pointer;

  &:disabled {
    background-color: #dadada;
    color: white;
    cursor: not-allowed;
  }
`

// 여기부터 모달 2 디자인
const Modal2Title = styled.h1`
    font-size: 32px;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    width: 100%;
  `

const ModalMenuParent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Modal2Menu = styled.div`
    padding-top: 20px;
    display: flex;
    width: 100%;
    
    span{
      font-size: 20px;
      margin-left: 15px;
    }

    button {
      display: flex;
    } 

    svg {
      margin-top: 1%;
    }
  `

const Modal2Title2 = styled.h3`
    margin-top: 25px;
    font-size: 30px;
    padding-bottom: 30px;
    width: 100%;
  `

const Modal2Menu2 = styled.h3`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    color: #666666;
  `

const Modal2TextBox = styled.input`
    width: 100%;
    height: 30%;
    margin-top: 20px;
    font-size: 24px;
    border-radius: 10px;
    padding-left: 20px;
    padding-bottom: 50px;
`

const BtnSpace = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 10%;
    margin-top: 60px;
  `

const Modal2CancelBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: lightsalmon;
    color: white;
    width: 50%;
    height: 70px;
    border-radius: 15px;
    font-size: 20px;
    font-weight: bold;
    margin-right: 20px;
    border: none;
    cursor: pointer;
  `

const Modal2Btn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center; 
    background-color: red;
    color: white;
    width: 50%;
    height: 70px;
    border-radius: 15px;
    font-size: 20px;
    font-weight: bold;
    border: none;
    cursor: pointer;

    &:disabled {
      background-color: #dadada;
      color: white;
      cursor: not-allowed;
    }
  `

// 모달 3,4의 검색창
const ModalSearch = styled.div`
    width: 100%;
    height: 7%;
    background-color: #f2f2f2;
    border-radius: 8px;
    padding: 10px;
    position: relative;
  `;

const SearchInput = styled.input`
    background-color: transparent; /* 투명 배경 설정 */
    border: none;
    width: 95%;
    height: 100%;
    outline: none; /* 포커스 시 테두리 제거 */
    display: flex;
  `;

const SearchIconWrapper = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
  `;

const SearchIcon = styled(FiSearch)`
    font-size: 20px;
    cursor: pointer;
  `;

const Modal = ({ title, onClose, modalKey }) => {
  const [content1, setContent1] = useState(false)
  const [content2, setContent2] = useState(false)
  const [content3, setContent3] = useState(false)
  const [content4, setContent4] = useState(false)
  const [content5, setContent5] = useState(false)
  const [modal, setModal] = useState(false)

  const titles = ["찾는 물품이 없어요", "물품이 안 팔려요", "다른 서비스로 이동할래요", "보안 및 개인정보가 우려되요", "기타"]

  const handleIconClick = () => {
    onClose(); // 모달을 닫기 위해 부모 컴포넌트에서 전달한 콜백 함수 호출
  };

  const closeModal = () => {
    setModal(false);
  }

  const isAnyChecked = content1 || content2 || content3 || content4 || content5;

  const Modal1 = () => {
    const [currentPw, setCurrentPw] = useState('');
    const [newPw, setNewPw] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [confirmPwValid, setConfirmPwValid] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleCurrentPwChange = (e) => {
      setCurrentPw(e.target.value);
      console.log(e.target.value);
    };

    const handleNewPwChange = (e) => {
      setNewPw(e.target.value);
    };

    const handleConfirmPwChange = (e) => {
      const newConfirmPw = e.target.value;
      setConfirmPw(newConfirmPw);
      setConfirmPwValid(newConfirmPw === newPw);
    };

    const handlePwChange = async() => {
      try{
        const response = await axios.post('https://port-0-cpbeck-hdoly2altu7slne.sel5.cloudtype.app' + '/api/users/changing_password',{
            "data": {
              "user_password": currentPw,
              "password": newPw,
              "confirm_password": confirmPw,
              "authorization": token,
            }
        })
        alert("비밀번호 변경 완료");
        navigate('/')
      }
      catch(error){
        alert("비밀번호가 일치하지 않습니다.");
      }
    }


    // 새로운 비밀번호와 확인 값이 일치하는지 여부
    const isPwMatch = newPw === confirmPw;
    // 현재 비밀번호, 새 비밀번호, 새 비밀번호 확인 값이 비어 있지 않고, 새 비번과 확인 값이 일치하는 경우 변경 가능
    const isPwValid = currentPw !== '' && newPw !== '' && isPwMatch;

    return (
      <>
        <ModalMain>
          <Modal1Header>
            <Modal1Ig />
          </Modal1Header>

          <Modal1Main>
            <Modal1Text>비밀번호</Modal1Text>

            <Modal1Current>
              <Input
                type="password"
                placeholder="현재 암호를 입력해주세요"
                value={currentPw}
                onChange={handleCurrentPwChange}
              />
            </Modal1Current>

            <PwBox>
              <Input
                type="password"
                placeholder="새 암호를 입력해주세요"
                value={newPw}
                onChange={handleNewPwChange}
              />
            </PwBox>

            <PwOkBox>
              <Input
                type="password"
                placeholder="새 암호를 다시 입력해주세요"
                value={confirmPw}
                onChange={handleConfirmPwChange}
              />
            </PwOkBox>
            {!confirmPwValid && confirmPw.length > 0 && (
          <ErrorMessage>비밀번호가 일치하지 않습니다</ErrorMessage>
        )}

            <Modal1Text2>
              · 생년월일, 전화번호 등 개인정보와 숫자, 연속된 숫자, 연속된 키보드배열과 같이 쉬운
              비밀번호는 타인이 쉽게 알아낼 수 있으니 사용을 자제해 주세요.
            </Modal1Text2>
          </Modal1Main>

          <Modal1PwChangeBtn disabled={!isPwValid} onClick={handlePwChange}>변경하기</Modal1PwChangeBtn>
        </ModalMain>
      </>
    );
  };

  const Modal2 = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const onDelete = async() => {
      const response = await axios.post('https://port-0-cpbeck-hdoly2altu7slne.sel5.cloudtype.app/' + 'api/users/delete_user',
      {
        data: {
          authorization: token
        }
      })
      alert("회원탈퇴 성공")
      navigate("/")
      localStorage.removeItem('token')
    }

    return (
      <>
        <ModalMain>
          <Modal2Title>탈퇴 사유가 무엇인가요?</Modal2Title>

          <ModalMenuParent>
            <Modal2Menu>
              <button style={{ fontSize: "20px", backgroundColor: 'white', border: "none", fontWeight: "bold" }} onClick={() => { setContent1(!content1) }}>
                <FaCircleCheck
                  color={content1 ? '#0dcc5a' : 'lightgray'}
                  cursor="pointer"
                  size={25} />
                <span>{titles[0]}</span></button>
            </Modal2Menu>

            <Modal2Menu>
              <button style={{ fontSize: "20px", backgroundColor: 'white', border: "none", fontWeight: "bold" }} onClick={() => { setContent2(!content2) }}>
                <FaCircleCheck
                  color={content2 ? '#0dcc5a' : 'lightgray'}
                  cursor="pointer"
                  size={25} />
                <span>{titles[1]}</span></button>
            </Modal2Menu>

            <Modal2Menu>
              <button style={{ fontSize: "20px", backgroundColor: 'white', border: "none", fontWeight: "bold" }} onClick={() => { setContent3(!content3) }}>
                <FaCircleCheck
                  color={content3 ? '#0dcc5a' : 'lightgray'}
                  cursor="pointer"
                  size={25} />
                <span>{titles[2]}</span></button>
            </Modal2Menu>

            <Modal2Menu>
              <button style={{ fontSize: "20px", backgroundColor: 'white', border: "none", fontWeight: "bold" }} onClick={() => { setContent4(!content4) }}>
                <FaCircleCheck
                  color={content4 ? '#0dcc5a' : 'lightgray'}
                  cursor="pointer"
                  size={25} />
                <span>{titles[3]}</span></button>
            </Modal2Menu>

            <Modal2Menu>
              <button style={{ fontSize: "20px", backgroundColor: 'white', border: "none", fontWeight: "bold" }} onClick={() => { setContent5(!content5) }}>
                <FaCircleCheck
                  color={content5 ? '#0dcc5a' : 'lightgray'}
                  cursor="pointer"
                  size={25} />
                <span>{titles[4]}</span></button>
            </Modal2Menu>
          </ModalMenuParent>

          <Modal2TextBox>

          </Modal2TextBox>

          <Modal2Title2>탈퇴 전 유의 사항</Modal2Title2>
          <Modal2Menu2>· 탈퇴 시, 회원 계정의 모든 정보는 삭제되며 재가입 시에도 복구되지 않습니다.</Modal2Menu2>
          <Modal2Menu2>· 또한, 본인 계정에 등록된 게시물 또는 회원이 작성한 게시물 일체는 삭제됩니다.</Modal2Menu2>

          <BtnSpace>

            <Modal2CancelBtn onClick={() => { closeModal(); onClose(); }}>
              취소하기
            </Modal2CancelBtn>
            <Modal2Btn disabled={!isAnyChecked}  onClick={onDelete}>
              탈퇴하기
            </Modal2Btn>
          </BtnSpace>
        </ModalMain>
      </>
    )
  };

  const Modal3 = () => {
    return (
      <>
        <ModalMain>
          <ModalSearch>
            <SearchInput type="text" placeholder="상품명을 입력해주세요." />
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </ModalSearch>
        </ModalMain>
      </>
    )
  };

  const Modal4 = () => {
    return (
      <>
        <ModalMain>
          <ModalSearch>
            <SearchInput type="text" placeholder="상품명을 입력해주세요." />
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </ModalSearch>
        </ModalMain>
      </>
    )
  };

  const CustomModal = () => {
    console.log(modalKey)
    if (modalKey == "edit") return (<Modal1 />)
    else if (modalKey == "withdraw") return (<Modal2 />)
    else if (modalKey == "buyList") return (<Modal3 />)
    else if (modalKey == "sellList") return (<Modal4 />)
  }

  return (
    <ModalLayout>
      <ModalContent>
        <ModalHeader>
          <ModalHeaderL>
            <BackIcon onClick={handleIconClick} />
          </ModalHeaderL>

          <ModalHeaderR>
            {title}
          </ModalHeaderR>
        </ModalHeader>

        <ModalContainer>
          <CustomModal />
        </ModalContainer>

      </ModalContent>
    </ModalLayout>
  )
}

export default Modal;