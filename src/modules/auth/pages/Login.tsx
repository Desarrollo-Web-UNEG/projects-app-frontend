import "@auth/styles/index.css";
import { LoginForm, LoginImg } from "@auth/components";

const Login = () => {
  return (
    <div className="main-container">
      <LoginImg />
      <LoginForm />
    </div>
  );
};

export default Login;