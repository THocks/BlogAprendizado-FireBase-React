import styles from "./EditPost.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDoc } from "../../hooks/useFetchDoc";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDoc("posts", id);
  const [title, setTitle] = useState("");
  const [Image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.Image);

      const textTags = post.tagsArray.join(",");

      setTags(textTags);
    }
  }, [post]);

  const { user } = useAuthValue();

  const { updateDocument, response } = useUpdateDocument("posts");
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

    const data = {
      title,
      Image,
      body,
      tagsArray,
      uid: user.uid,
      createBy: user.displayName,
    };

    updateDocument(id, data);

    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editar publicação:{post.title}</h2>
          <p>Alterar os dados da publicação </p>
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
            <p className={styles.imgPage}>Imagem Atual</p>
            <img className={styles.imgPrev} src={post.Image} alt={post.title} />
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
              <button className="glow-on-hover">Editar</button>
            )}
            {response.loading && (
              <button className="glow-on-hover" disabled>
                Aguarde...
              </button>
            )}
            {response.error && <p className="error">{response.error}</p>}
            {formError.error && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
