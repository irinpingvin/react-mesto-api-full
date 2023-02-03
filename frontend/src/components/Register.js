import AuthForm from "./AuthForm";
import React from "react";
import {Link} from "react-router-dom";

function Register(props) {
  return (
    <div className="auth">
      <h3 className="auth__title">Регистрация</h3>
      <AuthForm buttonText='Зарегистрироваться' onSubmit={props.onRegister}/>
      <p className="auth__caption">Уже зарегистрированы?&nbsp;
        <Link className="auth__caption-link" to="/sign-in">Войти</Link>
      </p>
    </div>
  );
}

export default Register;