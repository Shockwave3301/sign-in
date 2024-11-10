function App() {
  return (
    <main>
      <form target="" method="POST">
        <label>
          E-mail
          <input
            type="email"
            name="email"
            autoComplete="email"
            aria-required="true"
            required
          />
        </label>

        <label>
          Пароль
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            aria-required="true"
            required
          />
        </label>

        <button>Вход</button>
      </form>
    </main>
  );
}

export default App;
