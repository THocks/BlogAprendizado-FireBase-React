import styles from "./Login.module.css";

import { useState, useEffect } from "react";
import { useAuthenticator } from "../../hooks/useAuthenticator";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // Import meu hook
  const { login, error: authError, loading } = useAuthenticator();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = {
      email,
      password,
    };

    const res = await login(user);
    console.log(res);
  };
  // monitrando o error autenticação
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);
  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Digite o usuário e senha criados na aba registro</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="Email do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Cadastre uma senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {!loading && <button className="glow-on-hover">Entrar</button>}
        {loading && (
          <button className="glow-on-hover" disabled>
            Cadastrando...
          </button>
        )}

        {error && <p className="error">`{error}</p>}
      </form>
    </div>
  );
};

export default Login;
