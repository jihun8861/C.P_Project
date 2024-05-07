import { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  display: none;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to right ,blue, salmon);
  z-index: 1000000;

  p {
    bottom: 80px;
    position: absolute;
    color: white;
  }
`;

const CalendarFrame = styled.div`
  width: 800px;
  height: 500px;
  position: absolute;
  top: 300px;
  background-color: black;
  border: 1px solid black;
  border-radius: 20px 20px 0px 0px;
  box-sizing: border-box;
`;

const CalenderHeader = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: none;
  box-sizing: border-box;

  h1 {
    font-size: 60px;
  }
`;

const CalendarBody = styled.div`
  width: 100%;
  height: 398px;
  display: flex;
  background-color: white;
  flex-wrap: wrap;
  box-sizing: border-box;
`;

const CalendarWeekly = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  font-weight: bold;
`;

const CalendarNode = styled.div`
  width: calc(100% / 7);
  height: calc(88% / 5);
  border: 1px solid black;
  box-sizing: border-box;
  cursor: pointer;
  font-weight: bold;
`;

const DailyModal = () => {

  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const [isChecked, setIsChecked] = useState(0);
  const [count, setCount] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <p>Current Date: {currentDate.toString()}</p>
      <CalendarFrame>
        <CalenderHeader>
          <h1 style={{color:"white"}}>4월</h1><h2 style={{marginLeft:"20px", color:"white"}}>Aprill</h2><h2 style={{marginLeft:"2%" , color:"white"}}>출석체크!</h2>
        </CalenderHeader>

        <CalendarBody>
          <CalendarWeekly style={{backgroundColor:"orange"}}>
            {week.map((day, index) => (
              <div key={index} style={{width:"calc(100% / 7)" , height:"100%" , border:"1px solid black" , display:"flex" , alignItems:"center" , justifyContent:"center"}}>{day}</div>
            ))}
          </CalendarWeekly>
          <CalendarNode />
          {Array.from({ length: 31 }, (item, index) => (
            <CalendarNode key={index}>
              <ul>{index + 1}</ul>
              <ul style={{color:"red" , fontSize:"35px" , marginLeft:"42%"}}></ul>
            </CalendarNode>
          ))}
          {Array.from({ length: 3 }, (index2) => (
            <CalendarNode key={index2} />
          ))}
        </CalendarBody>
      </CalendarFrame>
    </Container>
  );
}

export default DailyModal;
