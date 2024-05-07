import { useState,useEffect } from "react";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const Container = styled.div`
  width: 100%;
  height: 350px;
  display: flex;
  flex-direction: column;
  margin-top: 3%;
  background-color: lightsalmon;
`;

const ArrowFrame = styled.div`
  width: 100%;
  height: 330px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InputFrame = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LinkStyle = {
  width: "50px",
  height: "50px",
  cursor: "pointer",
};

const CustomRadio = styled.input`
  margin: 0% 5px 3% 5px;
  background-color: red;
  /* 원하는 CSS를 여기에 추가하세요 */
`;

const RadioStyle = {
  margin: "0% 5px 3% 5px",
  backgroundColor: "red",
};

const Banner = () => {

  const [count, setCount] = useState(0);

  const prevBanner = () => {
    if(count == 0) {
      return setCount(3);
      
    }
    else {
      setCount(count -1);
    }
  }

  const nextBanner = () => {
    if(count == 3) {
      setCount(0);
    }
    else {
      setCount(count + 1);
    }
  }

  const bannerImg = [
    {index: 0, color:"gray"}, {index: 1, src:"salmon"} , {index: 2, src:"green"} , {index: 3, src:"lightblue"}
  ];

  useEffect(() => {
    const autoBanner = setInterval(() => {
      nextBanner();
    }, 4000);
    return () => clearInterval(autoBanner); 
  }, [count]);

  return (
    <Container style={{backgroundColor:bannerImg[count].src}}>
 
      <ArrowFrame>
        <IoIosArrowBack style={LinkStyle} onClick={prevBanner} />
        <IoIosArrowForward style={LinkStyle} onClick={nextBanner} />
      </ArrowFrame>
  
      <InputFrame>
        {bannerImg.map((item, banner) => (
          <CustomRadio
            key={banner}
            type="radio"
            style={RadioStyle}
            checked={count === item.index}
            onChange={() => setCount(item.index)}
          />
        ))}
      </InputFrame>
    </Container>
  )
}

export default Banner;