import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 250px;
  margin-top: 40px;
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
  background-size: 100% 100%;
  background-position: center;
  position: relative;
  animation: ${fadeIn} 0.5s ease-in-out;
  transition: background-image 0.5s ease-in-out;
  cursor: pointer;
`;

const ArrowFrame = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const InputFrame = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const LinkStyle = {
  width: "50px",
  height: "50px",
  cursor: "pointer",
};

const CustomRadio = styled.input`
  margin: 0% 5px 1% 5px;
  background-color: red;
`;

const Banner = () => {
  const [count, setCount] = useState(0);

  const prevBanner = () => {
    if (count === 0) {
      setCount(bannerImg.length - 1);
    } else {
      setCount(count - 1);
    }
  };

  const nextBanner = () => {
    if (count === bannerImg.length - 1) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  };

  const bannerImg = [
    { index: 0, src: "/images/b1.png" },
    { index: 1, src: "/images/b2.png" },
    { index: 2, src: "/images/b3.png" },
  ];

  useEffect(() => {
    const autoBanner = setInterval(() => {
      nextBanner();
    }, 4000);
    return () => clearInterval(autoBanner);
  }, [count]);

  return (
    <Container backgroundImage={bannerImg[count].src}>
      <ArrowFrame>
        <IoIosArrowBack style={LinkStyle} onClick={prevBanner} />
        <IoIosArrowForward style={LinkStyle} onClick={nextBanner} />
      </ArrowFrame>

      <InputFrame>
        {bannerImg.map((item) => (
          <CustomRadio
            key={item.index}
            type="radio"
            checked={count === item.index}
            onChange={() => setCount(item.index)}
          />
        ))}
      </InputFrame>
    </Container>
  );
};

export default Banner;