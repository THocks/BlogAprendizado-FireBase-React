import { Link } from "react-router-dom";
import styles from "./About.module.css";
import logo from "../../imgs/logo.png";

function About() {
  return (
    <div className={styles.about}>
      <h2>
        <img src={logo} alt="logo" />
      </h2>
      <p>
        Este projeto consiste em um blog feito com React no front-end e FireBase
        no back-end Abordando, varios Hooks do react e também do fireBase.
        Contento sistema de login e autenticação, e salve de dados no FireBase.
      </p>
      <Link to="/post/postuser" className="glow-on-hover">
        Criar publicação
      </Link>
    </div>
  );
}

export default About;
