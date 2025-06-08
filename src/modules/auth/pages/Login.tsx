import "@auth/styles/index.css";
import {
  LoginForm,
  LoginImg,
  LoginImgTop,
  LoginImgBottom,
} from "@auth/components";
import { useEffect, useState } from "react";

const Login = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900); // Puedes ajustar el breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    <>
      <LoginImgTop />
      <div className="main-container">
        <LoginForm />
      </div>
      <LoginImgBottom />
    </>
  ) : (
    <div className="main-container">
      <LoginImg />
      <LoginForm />
    </div>
  );
};

export default Login;
