import styles from "./PostUser.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const PostUser = () => {
  const [title, setTitle] = useState("");
  const [Image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("posts");
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // valida url
    try {
      new URL(Image);
    } catch (error) {
      setFormError("A Imagem precisa ser uma url");
    }

    // criar o array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // checar todos os valores

    if (!title || !Image || !tags || !body) {
      setFormError("Por favor , preencha todos os campos");
    }

    if (formError) return;

    insertDocument({
      title,
      Image,
      body,
      tagsArray,
      uid: user.uid,
      createBy: user.displayName,
    });

    navigate("/");
  };

  return (
    <div className={styles.post}>
      <h2>Criar nova publicação</h2>
      <p>Escreva sobre funcionalide e descrição da sua planta </p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Titulo:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="De um título para sua publicação"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>URL da Image:</span>
          <input
            type="url"
            name="image"
            placeholder="Insira sua imagem"
            onChange={(e) => setImage(e.target.value)}
            value={Image}
          />
        </label>
        <label>
          <span>Contéudo:</span>
          <textarea
            name="body"
            required
            placeholder="Falhe sobre os detalhes e funcionalidades"
            onChange={(e) => setBody(e.target.value)}
            value={body}></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira as tags separadas por virgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && (
          <button className="glow-on-hover">Cadastrar</button>
        )}
        {response.loading && (
          <button className="glow-on-hover" disabled>
            Aguarde...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
        {formError.error && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default PostUser;
