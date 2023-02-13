import styles from "./Footer.module.css";
import { BsLinkedin } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";
import logo from "../../imgs/Logo2.png";
import { useState } from "react";

const Footer = () => {
  const [form, setForm] = useState("");

  const handleClick = () => {
    alert("Obrigado por entrar em contato");

    setForm("");
  };
  return (
    <footer className={styles.footer_distributed}>
      <div className={styles.footer_left}>
        <h3>
          <img src={logo} alt="logo" className={styles.logo} />
        </h3>

        <p className={styles.footer_links}>
          <a href="/" rel="noopener noreferrer">
            Inicio
          </a>
          ·
          <a href="/about" rel="noopener noreferrer">
            Sobre
          </a>
          ·
          <a href="/login" target="_blank" rel="noopener noreferrer">
            Serviços
          </a>
          ·
        </p>

        <p className={styles.footer_company_name}> Thiago Lima&copy; 2023</p>

        <div className={styles.footer_icons}>
          <a
            href="https://www.linkedin.com/in/thiago-lima-394b36232/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsLinkedin />
          </a>
          <a
            href="https://github.com/THocks"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsGithub />
          </a>
          <a
            href="https://web.whatsapp.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsWhatsapp />
          </a>
        </div>
      </div>

      <div className={styles.footer_right}>
        <p>Entre em Contato</p>

        <form>
          <input type="text" name="email" placeholder="Email" />
          <textarea name="message" placeholder="Mensagem"></textarea>
          <button className="glow-on-hover" onClick={() => handleClick}>
            Enviar
          </button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
