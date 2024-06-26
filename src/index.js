import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import Auction from './pages/Auction';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MyPage from './pages/MyPage';
import Bid from './pages/Bid';
import KakaoRedirect from './pages/KakaoRedirect';
import reportWebVitals from './reportWebVitals';
import CustomerSupport from './pages/CustomerSupport';
import SearchResult from './pages/SearchResult';
import Chat from './pages/Chat';
import SocketSelect from './pages/SocketSelect';
import EmployeeInfo from './pages/EmployeeInfo';
import Hotdeal from './pages/Hotdeal';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/Auction" element={<Auction />} />
        <Route path="/Bid" element={<Bid />} />
        <Route path="/KakaoRedirect" element={<KakaoRedirect />} />
        <Route path="/CustomerSupport" element={<CustomerSupport />} />
        <Route path="/SearchResult" element={<SearchResult />} />
        <Route path="/SocketSelect" element={<SocketSelect/>} />
        <Route path="Chat" element={<Chat/>} />
        <Route path="/Hotdeal" element={<Hotdeal/>} />
        <Route path="/EmployeeInfo" element={<EmployeeInfo />} />
      </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
