import styles from "./Register.module.css";
import { useState, useEffect } from "react";
import { useAuthenticator } from "../../hooks/useAuthenticator";
const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  // Import meu hook
  const { createUser, error: authError, loading } = useAuthenticator();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = {
      displayName,
      email,
      password,
    };
    if (password !== confirmpassword) {
      setError("As senhas estão diferentes, elas precisam ser iguais");
    }

    const res = await createUser(user);
    console.log(res);
  };
  // monitrando o error autenticação
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <>
      <div className={styles.body}>
        <div className={styles.box}>
          <div className={styles.img_box}>
            <img
              src="https://reactscript.com/wp-content/uploads/2016/06/React-Components-For-The-Web-Animations-API.gif"
              alt="nome"
            />
          </div>
          <div className={styles.form_box}>
            <h2>Criar Conta</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.input_group}>
                <label> Nome Completo</label>
                <input
                  type="text"
                  name="display"
                  required
                  placeholder="Nome do usuário"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>

              <div className={styles.input_group}>
                <label>E-mail</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email do usuário"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className={styles.input_group}>
                <label>Senha</label>
                <input
                  type="password"
                  name="confirmpassword"
                  required
                  placeholder="Confirme a sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className={styles.input_group}>
                <label>Confirmar Senha</label>
                <input
                  type="password"
                  name="confirmpassword"
                  required
                  placeholder="Confirme a sua senha"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {!loading && (
                <button className="glow-on-hover">Cadastre-se</button>
              )}
              {loading && (
                <button className="glow-on-hover" disabled>
                  Cadastrando...
                </button>
              )}

              {error && <p className="error">`{error}</p>}
            </form>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default Register;
