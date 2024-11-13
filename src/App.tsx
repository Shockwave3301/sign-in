import "./App.css";
import { FormEvent, useState } from "react";

const App = () => {
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);

  const handleSubmit = (e: any): void => {
    console.log({ e });
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

    alert(`Login attempt.\nLogin: ${email}\nPassword: ${password}`);
  };

  const hideEmailError = (): void => setEmailError("");
  const hidePasswordError = (): void => setPasswordError("");

  const togglePasswordVisiblity = (): void => {
    setIsPasswordShown(!isPasswordShown);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1>Логин</h1>
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
        <label htmlFor="email">Почта</label>
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
        <label htmlFor="password">Пароль</label>
        <span className="fieldErrorText">{passwordError}</span>
        <button
          type="button"
          className="showPassword"
          onClick={togglePasswordVisiblity}
        >
          Показать пароль
        </button>
        <a href="" className="forgotPassword">
          Забыли пароль?
        </a>
      </div>

      <button className="submitButton" type="submit">
        ВОЙТИ
      </button>
    </form>
  );
};

export default App;
