import "./App.css";
import Spinner from "./images/spinner.svg";

import { useState } from "react";

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);

  const [isRecoveryMode, setIsRecoveryMode] = useState<boolean>(false);
  const [isLetterSent, setIsLetterSent] = useState<boolean>(false);

  const hideEmailError = (): void => setEmailError("");
  const hidePasswordError = (): void => setPasswordError("");
  const openPasswordRecoveryMode = (): void => setIsRecoveryMode(true);
  const openLoginMode = (): void => setIsRecoveryMode(false);

  const togglePasswordVisiblity = (): void => {
    setIsPasswordShown(!isPasswordShown);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (isLoading) {
      return;
    }

    const form = e.currentTarget.elements;
    const emailInput = form.namedItem("email") as HTMLInputElement;
    const passwordInput = form.namedItem("password") as HTMLInputElement;

    const email = emailInput?.value || "";
    const password = passwordInput?.value || "";

    if (!/[^ ]+@[^ ]+\.[^ ]+/.test(email)) {
      setEmailError("Некорректный формат электронной почты");
      return;
    }

    if (!email) {
      setEmailError("Поле обязательно для заполнения");
      return;
    }

    if (!password && !isRecoveryMode) {
      setPasswordError("Поле обязательно для заполнения");
      return;
    }

    setIsLoading(true);

    if (isRecoveryMode) {
      setTimeout(() => {
        // тут бы был, помимо прочего, запрос отправки письма с инструкцией по восстановлению пароля
        setIsLetterSent(true);
        setIsLoading(false);
      }, 1000);
    }

    if (!isRecoveryMode) {
      setTimeout(() => {
        // а тут был бы сам запрос логина
        alert(`Логин: ${email}\nПароль: ${password}`);
        setIsLoading(false);
      }, 1000);
    }
  };

  const getButtonText = (): string => {
    if (isRecoveryMode && !isLetterSent) {
      return "ОТПРАВИТЬ ПИСЬМО С ИНСТРУКЦИЕЙ";
    }

    if (isRecoveryMode && isLetterSent) {
      return "ПИСЬМО С ИНСТРУКЦИЕЙ ПО ВОССТАНОВЛЕНИЮ ПАРОЛЯ ОТПРАВЛЕНО";
    }

    return "ВОЙТИ";
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1>{isRecoveryMode ? "Восстановление пароля" : "Вход"}</h1>
      <div className="field">
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          placeholder="" // пустой селектро нужен для селектора input:not(:placeholder-shown)
          className={emailError ? "errorField" : undefined}
          aria-required="true"
          aria-invalid={!!emailError}
          aria-errormessage={!!emailError ? "email-error" : undefined}
          onFocus={hideEmailError}
        />
        <label htmlFor="email">Почта</label>
        <span className="fieldErrorText" id="email-error">
          {emailError}
        </span>
        {isRecoveryMode && (
          <button
            type="button"
            className="linkButton showPassword"
            onClick={openLoginMode}
          >
            Отмена
          </button>
        )}
      </div>

      {!isRecoveryMode && (
        <div className="field">
          <input
            type={isPasswordShown ? "text" : "password"}
            name="password"
            id="password"
            className={passwordError && "errorField"}
            autoComplete="current-password"
            placeholder="" // пустой селектро нужен для селектора input:not(:placeholder-shown)
            aria-required="true"
            aria-invalid={!!passwordError}
            aria-errormessage={!!passwordError ? "password-error" : undefined}
            onFocus={hidePasswordError}
          />
          <label htmlFor="password">Пароль</label>
          <span className="fieldErrorText" id="password-error">
            {passwordError}
          </span>
          <button
            type="button"
            className="linkButton showPassword"
            onClick={togglePasswordVisiblity}
          >
            Показать пароль
          </button>
          <button
            type="button"
            className="linkButton forgotPassword"
            onClick={openPasswordRecoveryMode}
          >
            Забыли пароль?
          </button>
        </div>
      )}

      <button
        className={`submitButton ${
          isRecoveryMode && isLetterSent ? "recoveryLetterSendButton" : ""
        }`}
        type="submit"
        disabled={isRecoveryMode && isLetterSent} // Чтобы юзер не отправлял миллион запросов на сброс пароля
      >
        {isLoading ? (
          <img src={Spinner} alt="Загрузка..." className="spinner" />
        ) : (
          getButtonText()
        )}
      </button>
    </form>
  );
};

export default App;
