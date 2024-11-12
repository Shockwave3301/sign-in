import "./App.css";
import { FormEvent, useState } from "react";

const App = () => {
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);

  const handleSubmit = (e: any): void => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    if (!email) {
      setEmailError("Поле обязательно для заполнения");
      return;
    }

    if (!/.+@.+\..+/.test(email)) {
      setEmailError("Некорректный формат электронной почты");
      return;
    }

    if (!password) {
      setPasswordError("Поле обязательно для заполнения");
      return;
    }

    alert("submit!");
  };

  const hideEmailError = (): void => setEmailError("");
  const hidePasswordError = (): void => setPasswordError("");

  const togglePasswordVisiblity = (): void => {
    setIsPasswordShown(!isPasswordShown);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1>Login</h1>
      <div className="field">
        <input
          className={emailError && "errorField"}
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          aria-required="true"
          placeholder=""
          onFocus={hideEmailError}
        />
        <label htmlFor="email">Email</label>
        <span className="fieldErrorText">{emailError}</span>
      </div>

      <div className="field">
        <input
          className={passwordError && "errorField"}
          type={isPasswordShown ? "text" : "password"}
          name="password"
          id="password"
          placeholder=""
          autoComplete="current-password"
          aria-required="true"
          onFocus={hidePasswordError}
        />
        <label htmlFor="password">Password</label>
        <span className="fieldErrorText">{passwordError}</span>
        <button
          type="button"
          className="showPassword"
          onClick={togglePasswordVisiblity}
        >
          Показать пароль
        </button>
      </div>

      <button className="submitButton" type="submit">
        ENTER
      </button>
    </form>
  );
};

export default App;
