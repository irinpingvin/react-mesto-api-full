import AuthForm from "./AuthForm";
import React from "react";

function Login(props) {
  return (
    <div className="auth">
      <h3 className="auth__title">Вход</h3>
      <AuthForm buttonText='Войти' onSubmit={props.onLogin}/>
    </div>
  );
}

export default Login;