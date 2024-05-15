import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_REDIRECT_URL}/?code=${code}`, {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        });

        const { token, account } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("name", account.kakaoName);

        // 로그인 성공 확인 로그
        console.log("로그인 성공:", { token, account });

        setLoading(false);
        navigate("/");
      } catch (error) {
        console.error("Kakao login failed:", error);
        setError("로그인에 실패했습니다. 다시 시도해주세요.");
        setLoading(false);
      }
    };

    if (code) {
      kakaoLogin();
    } else {
      setError("인증 코드가 없습니다. 다시 시도해주세요.");
      setLoading(false);
    }
  }, [code, navigate]);

  if (loading) {
    return (
      <>
        <p>로그인 중입니다.</p>
        <p>잠시만 기다려주세요.</p>
      </>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return null;
};

export default KakaoRedirect;
