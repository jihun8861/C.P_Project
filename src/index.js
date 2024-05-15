import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import Auction from './pages/Auction';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MyPage from './pages/MyPage';
import Test from './pages/Test';
import Test2 from './pages/Test2';
import Bid from './pages/Bid';
import Home2 from './pages/Home2';
import KakaoRedirect from './pages/KakaoRedirect';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmployeeInfo from './pages/EmployeeInfo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/Auction" element={<Auction />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/Test2" element={<Test2 />} />
        <Route path="/Bid" element={<Bid />} />
        <Route path="/EmployeeInfo" element={<EmployeeInfo />} />
        <Route path="/KakaoRedirect" element={<KakaoRedirect />} />

        <Route path="/Home2" element={<Home2 />} />
      </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
