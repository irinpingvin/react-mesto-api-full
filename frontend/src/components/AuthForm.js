import React from "react";

function AuthForm(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    setEmail('');
    setPassword('');
  },[]);

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit({
      "password": password,
      "email": email
    });
  }

  return (
    <form className="auth__form" onSubmit={handleSubmit}>
      <input type="email" required className="auth__input" id="email-input" placeholder="Email" value={email}
             onChange={handleEmailChange}/>
      <input type="password" required className="auth__input" id="password-input" placeholder="Пароль"
             value={password} onChange={handlePasswordChange}/>
      <button type="submit" className="auth__submit-button">{props.buttonText}</button>
    </form>
  );
}

export default AuthForm;